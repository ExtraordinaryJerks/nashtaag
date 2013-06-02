var Taag = require('../models/taag.js');
var issue = require('../models/issue.js');
var mongo = require('mongoose');
module.exports = TaagRoute;

function TaagRoute(connection){
	mongo.connect(connection);
}

TaagRoute.prototype = {
	showTaags: function(req, res){
    	task.find({itemCompleted: false}, function foundTaags(err, items) 
    	{
      		res.render('index',{title: 'Nashville Taags ', taags: items})
    	});
	},

	showTaag: function(req, res){
    Taag.findOne({Code:req.params.code},function(err, item) 
    {
      console.log(item);
      res.render('showTaag',{title: 'Single Taag' , taag: item});
    });

  },

	saveTaag: function(req, res){
     var isNew = false;
     if(req.body.taag.id == '')
      {isNew = true;}

      var newTaag = new Taag(req.body.taag);
      
      if(isNew){
          newTaag.save(function(err,createdTaag){
          if(err){
              console(err);
              res.writeHead(200, {"Content-Type": "application/json"});
              res.write(JSON.stringify({isSuccessful:false,responseMessage:err.msg}));
              res.end();
            }else{
              res.writeHead(200, {"Content-Type": "application/json"});
              res.write(JSON.stringify({isSuccessful:true,code:createdTaag.Code}));
              res.end();
            }
       });
      }else{
        var query = {_id:req.body.id};
       Taag.findOneAndUpdate(query,
        newTaag,
        {upsert:isNew},
        function(err,upsertedTaag){
          if(err){
              res.write('{isSuccessful:false,responseMessage:'+ err.msg+'}');
              res.end();
            }else{
              res.write("{isSuccessful:true,code:'"+ createdTaag.Code + "'}");
              res.end();
            }
       });
      }
	},

  editTaag: function(reg, res){
    res.render('editTaag', { title: 'Create/Edit a Taag' });
    //res.write('test response');
    //res.end();
  }
}