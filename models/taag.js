var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var TaagSchema = new Schema({
	  Type : String
	, Code: String
	, Title : String
	, Description : String
});

module.exports = mongoose.model('TaagModel', TaskSchema)