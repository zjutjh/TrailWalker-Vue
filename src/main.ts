import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ErrorPlugin from "./plugins/errorPlugin";
Vue.use(ErrorPlugin);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    // @ts-ignore
    window.history.replaceState(null, null, window.location.href);
    next();
});
new Vue({
    // @ts-ignore
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
