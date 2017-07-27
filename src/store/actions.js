const action = {
	UserLogin({commit},data){
		console.log(data);
		commit("LOGIN",data)
	},
	UserLogout({commit}){
		commit("LOGOUT")
	},
	UserName({commit},data){
		commit("USERNAME",data)
	}
}
export default action