const mutations = {
	LOGIN:(state,data) => {
			console.log("commit Login")
			localStorage.setItem('token',data)
			state.token = data
	},
	LOGOUT:(state) => {
		console.log('logout');
		localStorage.removeItem('token');
		state.token = null
	},
	USERNAME:(state,data) => {
		localStorage.setItem('username',data)
		state.username = data
	}
}
export default mutations