import Vue from "vue";
import Vuex from "vuex";
import {postData} from "@/utils/fetch";
import {API, apiMap} from "@/utils/api/api";
import IUser from "@/interface/IUser";
import IGroup from "@/interface/IGroup";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        routes: [],
        currentGroup: {},
        isLogin: false,
        isEnd: false,
        systemInfo: {}
    },
    mutations: {
        setCurrentUser(state, user: IUser) {
            state.currentUser = user;
        },
        setCurrentGroup(state, group: IGroup) {
            state.currentGroup = group;
        },
        setSystemInfo(state, info) {
            state.systemInfo = info;
        },
        setRoutes(state, routes: []) {
            state.routes = routes;
        },
        setLogin(state, isLogin = true) {
            state.isLogin = isLogin;
        }
    },
    actions: {

        async getMyInfo(context) {
            let res = await postData(API(apiMap.getUserInfo), null);

            if (res.code === 1) {
                context.commit("setCurrentUser", res.data);
                context.commit("setLogin");
            } else {
                context.commit("setLogin", false);
            }

        },
        getRoutesInfo(context) {
            postData(API(apiMap.listRoutes), null)
                .then((res) => {
                    if (res.code === 1) {
                        if (res.data !== {}) {
                            context.commit("setRoutes", res.data);
                        }
                    }
                });
        },
        async getMyGroup(context) {
            let res = await postData(API(apiMap.getMyGroupInfo));
            if (res.code === 1) {
                context.commit("setCurrentGroup", res.data as IGroup);
            } else {
                context.commit("setCurrentGroup", {});
            }

        },
        async getSystemInfo(context) {
            let res = await postData(API(apiMap.systemInfo));

            if (res.code === 1) {
                context.commit("setSystemInfo", res.data);

            }

        }
    },
});
