//检测token是否过期
const jwt = require('jsonwebtoken')
module.exports = function (req,res,next){
	let isauth = req.headers['authorization']
	if(isauth){
		let token = req.headers['authorization'].split(' ')[1]
		//	解构token，生成一个对象｛name: xx,iat: xx,exp: xx｝
		let decoded = jwt.decode(token,'secret')
		console.log(decoded);
		if(token && decoded.exp <= Date().now/1000){
			return res.json({
				status:401,
				message:"请重新登录"
			})
		}
	}else{
		return res.json({
			status:401,
			message:"请重新登录"
		})
	}
	
	next();
}