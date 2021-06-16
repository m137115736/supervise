import Home from '../views/home/home.vue';
export default [{
	path: '/',
	name: '_home',
	redirect: '/home',
	component: Home,
	children: [{
		path: '/home',
		name: 'scene',
		component: () => import('../components/scene.vue')
	},{
		path: '/statistics',
		name: 'statistics',
		component: () => import('../components/statistics.vue')
	},{
		path: '/reportTables',
		name: 'reportTables',
		component: () => import('../components/reportTables.vue')
	},{
		path: '/system/dictionary',
		name: 'system/dictionary',
		component: () => import('../components/system-dictionary.vue')
	}]
}]
