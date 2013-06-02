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
    
     //console.log(Taag);
     


     var isNew = false;
     if(req.body.id == '')
      {isNew = true;}

       var newTaag = new Taag();
       //newTaag._id = req.body.id;
       newTaag.Type =req.body.type;
       newTaag.Code = req.body.code;
       newTaag.Title = req.body.title;
       newTaag.Description = req.body.description; 
      console.log(req.body);
       newTaag.save(function(err){
          console.log('in the save function');
          if(err){
              //console.log('{isSuccessful:false,responseMessage:'+ err.msg+'}');
              console.log('fail');
            }else{
              //console.log('{isSuccessful:true:code:'+ theTaag.Code+'}');
              console.log('success');
            }
       });

       // Taag.findByIdAndUpdate(newTaag._id,
       //                            newTaag,  
       //                            {upsert:isNew},
       //    function(err){
       //      if(err)
       //      {
       //        res.write('{isSuccessful:false,responseMessage:'+ err.msg+'}');
       //        res.end();
       //      }else{
       //        res.write('{isSuccessful:true:code:'+ newTaag.Code +'}');
       //        res.end();
       //      }
       //  });
      

      
      console.log('end of action');
	},

  editTaag: function(reg, res){
    res.render('editTaag', { title: 'Create/Edit a Taag' });
    //res.write('test response');
    //res.end();
  }
}