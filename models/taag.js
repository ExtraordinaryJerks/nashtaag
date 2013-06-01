var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var TaagSchema = new Schema({
	  Type : String
	, Code: String
	, Title : String
	, Description : String
	//, Issues : [mongoose.model('IssueModel')]
});

var Taag = mongoose.model('Taag',TaagSchema);
//module.exports = mongoose.model('TaagModel', TaagSchema);
