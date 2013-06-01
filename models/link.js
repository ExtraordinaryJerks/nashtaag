var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var LinkSchema = new Schema({
	  Url : String
});

module.exports = mongoose.model('LinkModel', LinkSchema);