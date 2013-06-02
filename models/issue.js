var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var IssueSchema = new Schema({
	  title : String
	, description: String
});

module.exports = mongoose.model('IssueModel', IssueSchema);