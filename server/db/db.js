const mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb://localhost/blog');
mongoose.Promise = global.Promise
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
	console.log('Mongodb started successfully')
})

var userSchema = mongoose.Schema({
	email: String,
	password: String,
	recheck: String,
	token: String,
	create_time: Date
})

var model = {
	User:db.model('User',userSchema)
}

module.exports = model