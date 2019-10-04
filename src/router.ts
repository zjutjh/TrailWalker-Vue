import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/Home",
            alias: "/",
            name: "Home",
            // tslint:disable-next-line: trailing-comma
            component: Home
        },
        {
            path: "/Group",
            name: "Group",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/Group.vue"),
            children: [
                {
                    path: "",
                    name: "Group",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.

                    component: () => import(/* webpackChunkName: "about" */ "./views/Group/HaveGroup.vue"),
                },
                {
                    path: "No",
                    name: "Group",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/Group/NoGroup.vue")
                },
                {
                    path: "Wait",
                    name: "Group",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/Group/WaitJoin.vue")
                },
                {
                    path: "Update",
                    name: "Group",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./views/Group/Update.vue")
                }]
        },
        {
            path: "/Me",
            name: "Me",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ "./views/Me.vue"),

            children: [
                {
                    path: "",
                    name: "Me",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.

                    component: () => import(/* webpackChunkName: "about" */ "./components/User/MyInfo.vue"),
                },
                {
                    path: "Create",
                    name: "Me",
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import(/* webpackChunkName: "about" */ "./components/User/CreateUser.vue")
                }
            ]
        }
    ]
});
