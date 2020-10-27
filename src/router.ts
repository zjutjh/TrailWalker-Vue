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
            component: () => import(/* webpackChunkName: "about" */ "./views/Group.vue"),
            children: [
                {
                    path: "",
                    name: "Group",
                    component: () => import(/* webpackChunkName: "about" */ "./views/Group/HaveGroup.vue"),
                },
                {
                    path: "No",
                    name: "Group",
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/Group/NoGroup.vue")
                },
                {
                    path: "Wait",
                    name: "Group",
                    component: () => import(/* webpackChunkName: "about" */ "./views/Group/WaitJoin.vue")
                },
                {
                    path: "Update",
                    name: "Group",
                    component: () => import(/* webpackChunkName: "about" */ "./views/Group/Update.vue")
                }]
        },
        {
            path: "/Me",
            name: "Me",
            component: () => import(/* webpackChunkName: "about" */ "./views/Me.vue"),
            children: [
                {
                    path: "",
                    name: "Me",
                    component: () => import(/* webpackChunkName: "about" */ "./components/User/MyInfo.vue"),
                },
                {
                    path: "Create",
                    name: "Me",
                    component: () => import(/* webpackChunkName: "about" */ "./components/User/CreateUser.vue")
                }
            ]
        }
    ]
});
