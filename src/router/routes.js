export let routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
        meta: {
            title: '绑定账号'
        },
    },
    {path: '/', redirect: {name: 'contractdetail'}},
    {
        path: '/contractlist',
        name: 'contractlist',
        component: () => import(/* webpackChunkName: "contractlist" */ '@/views/ContractList'),
        meta: {
            requireAuth: true,
            title: '选择合同'
        }
    },
    {
        path: '/contractdetail',
        name: 'contractdetail',
        component: () => import(/* webpackChunkName: "contractdetail" */ '@/views/ContractDetail'),
        meta: {
            requireAuth: true,
            title: '合同信息'
        }
    },
   /* {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/!* webpackChunkName: "about" *!/ './../views/About.vue'),
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
        component: () => import(/!* webpackChunkName: "hello" *!/ './../views/HelloWorld.vue'),
        meta: {
            title: '你好'
        }
    },*/
    {path: '*', redirect: {name: 'login'}},
];