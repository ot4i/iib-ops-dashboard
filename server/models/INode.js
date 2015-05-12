var mongoose = require('mongoose');

var INodeSchema = new mongoose.Schema({
	host: {
		type: String,
		required: true
	},
	port: {
		type: String,
		required: true
	},
	username: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	ssl: {
		type: Boolean,
		default: false
	}
});

module.exports = INodeSchema;