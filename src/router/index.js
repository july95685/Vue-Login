import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
		path: '/register',
		name: 'register',
		component(resolve) {
			require.ensure(['@/components/Register.vue'], () => {
				resolve(require('@/components/Register.vue'));
			});
		}
	},
	{
		path: '/login',
		name: 'login',
		component(resolve) {
			require.ensure(['@/components/Login.vue'], () => {
				resolve(require('@/components/Login.vue'));
			});
		}
	},
	{
		path: '/ui',
		name: 'ui',
		component(resolve) {
			require.ensure(['@/components/elementForm.vue'], () => {
				resolve(require('@/components/elementForm.vue'));
			});
		},
		meta: {
			requireAuth:true
		}
	},
	{
		path: '/home',
		name: 'home',
		component(resolve) {
			require.ensure(['@/components/Home.vue'], () => {
				resolve(require('@/components/Home.vue'));
			});
		}
	}
  ]
})

router.beforeEach((to,from,next) => {
	let token = localStorage.getItem('token')
	if(to.meta.requireAuth){
		if(token){
			next()
		}else{
			next({
				path: '/login',
				query:{ redirect: to.fullPath }
			})
		}
	}else{
		next()
	}
})

export default router
