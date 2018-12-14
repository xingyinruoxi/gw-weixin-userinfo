import Login from './../views/Login'
import ContractDetail from '../views/ContractDetail'
import ContractList from '../views/ContractList'

export let routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '绑定账号'
        },
    },
    {path: '/', redirect: {name: 'contractdetail'}},
    {
        path: '/contractlist',
        name: 'contractlist',
        component: ContractList,
        meta: {
            requireAuth: true,
            title: '选择合同'
        }
    },
    {
        path: '/contractdetail',
        name: 'contractdetail',
        component: ContractDetail,
        meta: {
            requireAuth: true,
            title: '合同信息'
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './../views/About.vue'),
        meta: {
            title: '关于我们'
        }
    },
    {
        path: '/hello',
        name: 'hello',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './../views/HelloWorld.vue'),
        meta: {
            title: '你好'
        }
    },

];