import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: '/home',
    },
    {
        path: "/login",
        name: "/login",
        meta: {
            title: "登录页面",
            requireAuth: false,
        },
        component: () => import("@/pages/login/login.vue"),
    },
    {
        path: "/home",
        name: "/home",
        meta: {
            title: "首页",
            requireAuth: true,
        },
        component: () => import("@/pages/home/home.vue"),
        children: [
            {
                path: "/home/index",
                name: "/home/index",
                meta: {
                    title: "首页",
                    requireAuth: true,
                },
                component: () => import("@/pages/content/index/index.vue")
            }
        ],
        redirect: "/home/index",
    },
    {
        path: "/content",
        name: "/content",
        meta: {
            title: "首页",
            requireAuth: true,
        },
        component: () => import("@/pages/home/home.vue"),
        children: [
            {
                path: "/content/table",
                name: "/content/table",
                meta: {
                    title: "表格展示",
                    requireAuth: true,
                },
                component: () => import("@/pages/content/table/table.vue")
            }
        ],
        redirect: "/content/table",
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/home',
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // if(localStorage.getItem("userInfo") !== null && localStorage.getItem("menuList") !== null){
        if (localStorage.getItem("userInfo") !== null) {
            store.commit("setUserInfo", JSON.parse((localStorage.getItem("userInfo") as any)));
            if (to.path === '/login') {
                next("home/index");
            } else {
                next();
            }
        } else {
            next("/login");
        }
    } else {
        next();
    }
})
export default router
