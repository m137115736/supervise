import axios from 'axios';
import {
	Message
} from 'view-design';

// 请求超时
axios.defaults.timeout = 10000; //设置超时时间为10s```

// #post请求方式请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求地址
axios.defaults.baseURL = 'localhost:8080/jsjd';

// 响应拦截
axios.interceptors.response.use((res) => {
	// 响应数据
	if (res.data.status === '200') {
		return Promise.resolve(res)
	}
	return res
}, (error) => {
	if (error.toString().indexOf('401') > 0) {

	} else if (error.toString().indexOf('400') > 0) {
		console.log('请求相关参数错误');
	} else if (error.toString().indexOf('408') > 0) {
		console.log('请求超时');
	} else if (error.toString().indexOf('404') > 0) {
		console.log('请检查网络情况或请求url');
	} else if (error.toString().indexOf('500') > 0) {
		console.log('GG 500 - _ -');
	}
	Message.error('系统发生异常，请联系管理员');
	return Promise.reject(error);
	reject(error)
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	})
};
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
