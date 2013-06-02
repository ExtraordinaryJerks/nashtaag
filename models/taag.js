var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, IssueSchema = require('./issue.js');

var TaagSchema = new Schema({
	  Type : String
	, Code: String
	, Title : String
	, Description : String
	, Issues : [IssueSchema]
});

module.exports = mongoose.model('Taag', TaagSchema);
