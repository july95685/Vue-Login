import axios from 'axios'
import router from './router/index'


axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	console.log('config');
	console.log(localStorage.getItem('token'));
	console.log(config);
	if(localStorage.getItem('token')){
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})
instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default {
	// 用户注册
	userRegister(data) {
		console.log(data);
		return instance.post('http://localhost:3000/api/register', data)
	},
	userLogin(data) {
		console.log(data);
		return instance.post('http://localhost:3000/api/login', data)
	},
	getUser(){
		return instance.get('http://localhost:3000/api/user')
	},
	delUser(data){
		return instance.post('http://localhost:3000/api/delete',data)
	}
}
