import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/Home",
            alias: "/",
            name: "Home",
            component: () => import(/* webpackChunkName: "about" */ "./views/Home.vue"),
        },
        {
            path: "/Dis",
            alias: "/",
            name: "Dis",
            component: () => import(/* webpackChunkName: "about" */ "./views/Dc.vue"),
        },
        {
            path: "/End",
            alias: "/",
            name: "End",
            component: () => import(/* webpackChunkName: "about" */ "./views/End.vue"),
        },
        {
            path: "/Refuse",
            alias: "/",
            name: "Refuse",
            component: () => import(/* webpackChunkName: "about" */ "./views/Refuse.vue"),
        },
        {
            path: "/NotStart",
            alias: "/",
            name: "NotStart.vue",
            component: () => import(/* webpackChunkName: "about" */ "./views/NotStart.vue"),
        },
        {
            path: "/Group",
            name: "Group",
            component: () => import(/* webpackChunkName: "about" */ "./views/Group/HaveGroup.vue"),
        },
        {
            path: "/Group/No",
            name: "Group",
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Group/NoGroup.vue")
        },
        {
            path: "/Group/Wait",
            name: "Group",
            component: () => import(/* webpackChunkName: "about" */ "./views/Group/WaitJoin.vue")
        },
        {
            path: "/Group/Update",
            name: "Group",
            component: () => import(/* webpackChunkName: "about" */ "./views/Group/Update.vue")
        },
        {
            path: "/Group/Match",
            name: "Group",
            component: () => import(/* webpackChunkName: "about" */ "./views/Group/MatchGroup.vue")

        },
        {
            path: "/Me",
            name: "Me",
            component: () => import("./components/User/MyInfo.vue"),
        },
        {
            path: "/Me/Create",
            name: "MeCreate",
            component: () => import("./components/User/CreateUser.vue")
        }
    ]
});
