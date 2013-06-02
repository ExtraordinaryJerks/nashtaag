var Taag = require('../models/taag.js');

function Code() {
}
Code.prototype = {
    create: function () {
        var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 10; i++ )
            code += possible.charAt(Math.floor(Math.random() * possible.length));
    
        Taag.findOne({Code:code},function(err, item) 
        {
          if (item != null)
            code = create();
        });

        return code;
    }
};