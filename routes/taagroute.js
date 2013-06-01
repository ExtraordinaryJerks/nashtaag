var taag = require('../models/taag.js');

module.exports = TaskList;

function TaagRoute(connection){
	//mongoose.connect(connection);
}

TaagRoute.prototype = {
	showTaags: function(req, res){
    	task.find({itemCompleted: false}, function foundTaags(err, items) 
    	{
      		res.render('index',{title: 'Nashville Taags ', taags: items})
    	});
	},

	showTaag: function(req, res){
		task.find({itemCompleted: false}, function foundTaags(err, item) 
    	{
      		res.render('taag',{title: 'Single Taag' , taag: item})
    	});
	},

	addTaag: function(req, res){
		var fullBody = '';
      
      req.on('data', function(chunk) {
        fullBody += chunk.toString();
      });
      
      req.on('end', function() {
        var json = JSON.parse(fullBody);

        newTaag = new taag();
        newTaag.code = json.code;

        newLocation.save(function savedTaag(err){
          if(err) {
            throw err;
          }
        });
        
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end();
      });	
	},
}