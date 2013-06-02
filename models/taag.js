var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var TaagSchema = new Schema({
	  Type : String
	, Code: String
	, Title : String
	, Description : String
	//, Issues : [mongoose.model('IssueModel')]
});

module.exports = mongoose.model('Taag', TaagSchema);
