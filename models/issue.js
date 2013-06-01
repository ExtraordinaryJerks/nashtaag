var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var IssueSchema = new Schema({
	  Title : String
	, Description: String
});

module.exports = mongoose.model('IssueModel', IssueSchema);