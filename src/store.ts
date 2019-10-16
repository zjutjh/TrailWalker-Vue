import Vue from "vue";
import Vuex from "vuex";
import {postData} from "@/utils/fetch";
import {API, apiMap} from "@/utils/api/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: undefined,
        routes: [],
        currentGroup: undefined,
        isLogin: false,
        isEnd: false,
        systemInfo: {},
        groupMates: undefined,
        isLoading: true,
        snackbar: {text: "TEST", isShow: false, color: "success"}
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setGroupMates(state, groupMates) {
            state.groupMates = groupMates;
        },
        setCurrentGroup(state, group) {
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
        },
        setLoading(state, isLoading = true) {
            state.isLoading = isLoading;
        },
        showSuccessbar(state, text) {
            state.snackbar.text = text;
            state.snackbar.isShow = true;
            state.snackbar.color = "success";
        },
        showErrorbar(state, text) {
            state.snackbar.text = text;
            state.snackbar.isShow = true;
            state.snackbar.color = "error";
        }
    },
    actions: {

        async getMyInfo(context) {
            const res = await postData(API(apiMap.getUserInfo), null);

            if (res.code === 1) {
                context.commit("setCurrentUser", res.data);
                context.commit("setLogin");
            } else {
                context.commit("setLogin", false);
                context.commit("setCurrentUser", null);
            }

        },
        async getRoutesInfo(context) {
            const res = await postData(API(apiMap.listRoutes), null);

            if (res.code === 1 && res.data !== {}) {
                context.commit("setRoutes", res.data);
            }
        },
        async getMyGroup(context) {

            const res = await postData(API(apiMap.getMyGroupInfo));

            if (res.code === 1) {
                context.commit("setCurrentGroup", res.data);
            } else {
                context.commit("setCurrentGroup", null);
            }

        },
        async getMyGroupMember(context) {

            const res = await postData(API(apiMap.listGroupMembers));
            if (res.code === 1) {
                context.commit("setGroupMates", res.data);
            } else {
                context.commit("setGroupMates", null);
            }

        },
        async getSystemInfo(context) {
            context.commit("setLoading", true);
            const res = await postData(API(apiMap.systemInfo));
            context.commit("setLoading", false);
            if (res.code === 1) {
                context.commit("setSystemInfo", res.data);
            }
        },
        showLoading(context) {
            context.commit("setLoading", true);
        },
        closeLoading(context) {
            context.commit("setLoading", false);
        }

    },
});
