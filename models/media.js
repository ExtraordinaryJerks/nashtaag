var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var MediaSchema = new Schema({
    type : String,
    title : String,
    url : String,
    image : String
});

module.exports = mongoose.model('Media', MediaSchema);