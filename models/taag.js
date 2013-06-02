var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, IssueSchema = require('./issue.js')
    , MediaSchema = require('./media.js');

var TaagSchema = new Schema({
	  type : String
	, code: String
	, title : String
	, description : String
	, issues : [IssueSchema]
    , media : [MediaSchema]
});

module.exports = mongoose.model('Taag', TaagSchema);
