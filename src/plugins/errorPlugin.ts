/**
 * 全局异常处理
 * } error
 * @param ret
 */
import Vue from "vue";

function isPromise(ret: { then: any; catch: any; }) {
    return (ret && typeof ret.then === "function" && typeof ret.catch === "function");
}

const errorHandler = (error: any, vm: any, info: any) => {
    console.error("抛出全局异常");
    // @ts-ignore
    console.error(vm);
    console.error(error);
    console.error(info);
    // @ts-ignore
    Vue.$store.state.commit("showErrorbar", "网络异常");
};

function registerActionHandle(actions: { [x: string]: (...args: any[]) => any; }) {
    Object.keys(actions).forEach(key => {
        let fn = actions[key];
        actions[key] = function(...args) {
            let ret = fn.apply(this, args);
            if (isPromise(ret)) {
                return ret.catch(errorHandler);
            } else { // 默认错误处理
                return ret;
            }
        };
    });
}

const registerVuex = (instance: { $options: { [x: string]: { [x: string]: {}; }; }; }) => {
    if (instance.$options["store"]) {
        const actions = instance.$options["store"]["_actions"] || {};
        if (actions) {
            const tempActions = {};
            Object.keys(actions).forEach(key => {
                // @ts-ignore
                tempActions[key] = actions[key][0];
            });
            registerActionHandle(tempActions);
        }
    }
};
const registerVue = (instance: { $options: { methods: {}; }; }) => {
    if (instance.$options.methods) {
        let actions = instance.$options.methods || {};
        if (actions) {
            registerActionHandle(actions);
        }
    }
};

const GlobalError = {
    install: (Vue: { config: { errorHandler: (error: any, vm: any, info: any) => void; }; mixin: (arg0: { beforeCreate(): void; }) => void; prototype: { $throw: (error: any, vm: any, info: any) => void; }; }, options: any) => {
        /**
         * 全局异常处理
         * @param {
         * } error
         * @param {*} vm
         */
        Vue.config.errorHandler = errorHandler;
        Vue.mixin({
            beforeCreate() {
                // @ts-ignore
                registerVue(this);
                // @ts-ignore
                registerVuex(this);
            }
        });
        Vue.prototype.$throw = errorHandler;
    }
};

export default GlobalError;
