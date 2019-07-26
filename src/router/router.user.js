export default {
    path: '/',
    name: '',
    meta: {
        hideInMenu: true
    },
    chidren: [{
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () => import('@/view/login/login.vue')
    }]
}
