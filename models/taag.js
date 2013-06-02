var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, IssueSchema = require('./issue.js')
    , MediaSchema = require('./media.js');

var TaagSchema = new Schema({
	  Type : String
	, Code: String
	, Title : String
	, Description : String
	, Issues : [IssueSchema]
    , Media : [MediaSchema]
});

module.exports = mongoose.model('Taag', TaagSchema);
