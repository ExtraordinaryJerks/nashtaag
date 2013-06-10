var mongoose = require('mongoose');

module.exports = ModelContext;

function ModelContext(connectionString){
    mongoose.connect(connectionString);
    mongoose.model('Issue', require('../models/issue.js').Issue);
    mongoose.model('Media', require('../models/media.js').Media);
    mongoose.model('Taag', require('../models/taag.js').Taag);
}

