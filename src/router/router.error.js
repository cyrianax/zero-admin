import Main from '@/components/main'

export default {
    path: '/error',
    name: 'error',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
        {
            path: '/401',
            name: 'error_401',
            meta: {
              hideInMenu: true
            },
            component: () => import('@/view/common/error-page/401.vue')
          },
          {
            path: '/500',
            name: 'error_500',
            meta: {
              hideInMenu: true
            },
            component: () => import('@/view/common/error-page/500.vue')
          },
          {
            path: '*',
            name: 'error_404',
            meta: {
              hideInMenu: true
            },
            component: () => import('@/view/common/error-page/404.vue')
          },
    ]
}