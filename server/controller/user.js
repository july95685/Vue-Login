const express = require('express')
const model = require('../db/db.js')
const router = express.Router()
const moment = require('moment')
const createToken = require('../middleware/createToken')
const checkToken = require('../middleware/checkToken')
const sha1 = require('sha1')

const Register = (req,res) => {
	console.log(req.body);
	let userRegister = new model.User({
		email:req.body.email,
		password: req.body.password,
		recheck: req.body.recheck,
		token:createToken(this.email)
	})
	console.log(userRegister);
	// userRegister.create_time = moment(ob)
	userRegister.save(err => {
		if(err) console.log(err)
		console.log('register success')
		res.json({
			success: true
		})
	})
}

const Login = (req,res) => {
	let userLogin = new model.User({
		email: req.body.email,
		password: sha1(req.body.password),
		token:createToken(this.email)
	})

	model.User.findOne({ email : userLogin.email}, (err,doc) => {
		if(err) console.log(err)
		if(!doc){
			console.log("帐号不存在");
			res.json({
				info:false
			})
		}else if(userLogin.password === sha1(doc.password) ){
			console.log("登录成功");
			var name = req.body.email;
			res.json({
				success:true,
				email:doc.email,
				token: createToken(name)
			})
		}else{
			console.log("密码错误");
			res.json({
				success:false
			})
		}
	})
}

const User = (req,res) => {
	model.User.find({},(err,doc)=>{
		if(err) console.log(err);
		if(doc){
			console.log('user doc');
			console.log(doc);
			res.send(doc);
		}
	})
}

const Delete = (req,res) =>{
	model.User.findOneAndRemove({ _id: req.body.id }, err => {
		if(err) console.log(err)
		console.log('删除用户成功')
		res.json({
			success: true
		})
	})
}

module.exports = (router) => {
	router.post('/register', Register),
	router.post('/login',Login),
	router.get('/user',checkToken,User),
	router.post('/delete',checkToken,Delete)
}