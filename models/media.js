var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var MediaSchema = new Schema({
    Type : String,
    Url : String,
    Image : String
});

module.exports = mongoose.model('Media', MediaSchema);