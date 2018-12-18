import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'
import {isLogin} from '@/lib/utils'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...routes
    ]
});
router.beforeEach((to, from, next) => {
    document.title =to.meta.title?to.meta.title:'信息查询';
    if (to.meta.requireAuth===true) {
        if (isLogin()) {
           next()
        } else {
            let {code}=to.query;
            next({
                path: '/login',
                query: {code: code}
            })
        }
    } else {
        next()
    }
});
export default router;
