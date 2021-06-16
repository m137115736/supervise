import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import ViewUI from 'view-design'
import {
	getToken
} from '../libs/util.js'
Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	routes
});
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch(err => err)
}

// router.beforeEach((to, from, next) => {
// 	ViewUI.LoadingBar.start();
// 	const token = getToken();
// 	if (token) {
// 		var toPath = to.path;
// 		var boxarr = [];
// 		var pos = to.path.indexOf('/');
// 		while (pos > -1) {
// 			boxarr.push(pos);
// 			pos = to.path.indexOf('/', pos + 1);
// 		}
// 		if (boxarr.length > 2) {
// 			let nextPath = toPath.substring(boxarr[1])
// 			next(nextPath)
// 		} else {
// 			next();
// 		}
// 	} else {
// 		if (to.path == '/login') {
// 			next();
// 		} else {
// 			next('/login');
// 		}

// 	}

// })
// router.afterEach(route => {
// 	ViewUI.LoadingBar.finish();
// });
export default router
