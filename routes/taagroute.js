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
     var theId;
     if(req.body.taag.id == '' || req.body.taag.id == 'undefined'){
      isNew = true;theId = null;
    }else{
      theId = req.body.taag.id;
    }
      var newTaag = new Taag(req.body.taag);
      var idObject = require('mongoose').Types.ObjectId;
       Taag.findById(new idObject(theId),
        function(err,foundTaag){
          if(err){
              res.writeHead(500,err.message);
              res.end();
            }else{
              if(foundTaag){
                  Taag.update({_id:new idObject(theId)},
                        newTaag,
                        function(err,updatedTaag){
                          res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.write(JSON.stringify({isSuccessful:true,code:updatedTaag.code}));
                          res.end();
                        });
              }else{
                  newTaag.save(
                    function(err,createdTaag){
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.write(JSON.stringify({isSuccessful:true,code:createdTaag.code}));
                      res.end();
                  });
              }
            }
       });
	},

  editTaag: function(reg, res){
    res.render('editTaag', { title: 'Create/Edit a Taag' });
    //res.write('test response');
    //res.end();
  }
}