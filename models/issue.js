var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var IssueSchema = new Schema({
	  title : String
	, description: String
    , creationDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Issue', IssueSchema);