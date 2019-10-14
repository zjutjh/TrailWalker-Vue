import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import ErrorPlugin from "./plugins/errorPlugin";
Vue.use(ErrorPlugin);

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
