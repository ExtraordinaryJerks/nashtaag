var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, IssueSchema = require('./issue.js')
    , MediaSchema = require('./media.js');

var TaagSchema = new Schema({
	  type : String
	, code: {type:String,lowercase:true }
	, title : String
	, description : String
	, issues : [IssueSchema.schema]
    , medias : [MediaSchema.schema]
});

module.exports = mongoose.model('Taag', TaagSchema);
