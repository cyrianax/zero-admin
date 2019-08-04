import Main from '@/components/main'
import parentView from '@/components/parent-view'

import error from './router.error';
import user from './router.user';

export default [
	error,
	//user,
	{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () => import('@/view/login/login.vue')
	},
	{
		path: '/',
		name: '_home',
		redirect: '/home',
		component: Main,
		meta: {
			hideInMenu: true,
			notCache: true
		},
		children: [
			{
				path: '/home',
				name: 'home',
				meta: {
					hideInMenu: true,
					title: '首页',
					notCache: true,
					icon: 'md-home'
				},
				component: () => import('@/view/common/single-page/home')
			}
		]
	},
	{
		path: '/message',
		name: 'message',
		component: Main,
		meta: {
			hideInBread: true,
			hideInMenu: true
		},
		children: [
			{
				path: 'message_page',
				name: 'message_page',
				meta: {
					icon: 'md-notifications',
					title: '消息中心'
				},
				component: () => import('@/view/common/single-page/message/index.vue')
			}
		]
	},
	{
		path: '/content',
		name: 'content',
		component: Main,
		meta: {
			hideInBread: true,
			// hideInMenu: true
			title: '文章'
		},
		children: [
			{
				path: 'home',
				name: 'content_home',
				meta: {
					icon: 'ios-book',
					title: '文章'
				},
				component: () => import('@/view/content/home/view.vue'),


			},
			{
				path: 'content_create',
				name: 'content_create',
				meta: {
					icon: 'ios-book',
					title: '新增文章',
					hideInMenu: true
				},
				component: () => import('@/view/content/edit/view.vue'),
			},
			{
				path: 'content_read',
				name: 'content_read',
				meta: {
					icon: 'ios-book',
					title: '查看文章',
					hideInMenu: true
				},
				component: () => import('@/view/content/read/view.vue'),
			},
			{
				path: 'content_edit',
				name: 'content_edit',
				meta: {
					icon: 'ios-book',
					title: '编辑文章',
					hideInMenu: true
				},
				component: () => import('@/view/content/edit/view.vue'),
			}
		]
	},
	{
		path: '/error_logger',
		name: 'error_logger',
		meta: {
			hideInBread: true,
			hideInMenu: true
		},
		component: Main,
		children: [
			{
				path: 'error_logger_page',
				name: 'error_logger_page',
				meta: {
					icon: 'ios-bug',
					title: '错误收集'
				},
				component: () => import('@/view/common/single-page/error-logger.vue')
			}
		]
	},
	{
		path: '/argu',
		name: 'argu',
		meta: {
			hideInMenu: true
		},
		component: Main,
		children: [
			{
				path: 'params/:id',
				name: 'params',
				meta: {
					icon: 'md-flower',
					title: route => `{{ params }}-${route.params.id}`,
					notCache: true,
					beforeCloseName: 'before_close_normal'
				},
				component: () => import('@/view/common/argu-page/params.vue')
			},
			{
				path: 'query',
				name: 'query',
				meta: {
					icon: 'md-flower',
					title: route => `{{ query }}-${route.query.id}`,
					notCache: true
				},
				component: () => import('@/view/common/argu-page/query.vue'),

			}
		]
	},
	//   {
	//     path: '',
	//     name: 'doc',
	//     meta: {
	//       title: '文档',
	//       href: 'https://lison16.github.io/iview-admin-doc/#/',
	//       icon: 'ios-book'
	//     }
	//   },
]
