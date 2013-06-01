var taag = require('../models/taag.js');
var issue = require('../models/issue.js');

module.exports = TaagRoute;

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
    console.log(req.params.code);
		// taag.find({Code:req.params.code},function(err, item) 
  //   	{
  //         console.log(item);
  //     		//res.render('taag',{title: 'Single Taag' , taag: item})
  //   	});
      res.write(req.params.code);
      res.end();
	},

	saveTaag: function(req, res){
    var fullBody = '';
     
     req.on('data', function(chunk) {
       fullBody += chunk.toString();
     });
      
     req.on('end', function() {
         var json = JSON.parse(fullBody);
         var isNew = false;
         if(json.id == ''){isNew = true;}

         var newTaag = new Taag();
         newTaag._id = json.id;
         newTaag.Type =json.Type;
         newTaag.Code = json.Code;
         newTaag.Title = json.Title;
         newTaag.Description = json.Description; 

         newTaag.findByIdAndUpdate(newTaag._id,
                                  newTaag,  
                                  {upsert:isNew},
          function(err){
            res.redirect('/editTaag/' + newTaag.Code);
        });
      });	
	},

  editTaag: function(reg, res){
    res.render('editTaag', { title: 'Create/Edit a Taag' });
    //res.write('test response');
    //res.end();
  }
}