var Issue = require('../models/issue.js');
var Media = require('../models/media.js');
var Taag = require('../models/taag.js');
var mongo = require('mongoose');
module.exports = TaagRoute;

function TaagRoute(connection){
	mongo.connect(connection);
}

TaagRoute.prototype = {
	showTaags: function(req, res){
    	Taag.find({},function(err,theReturnedTaags){
        if(err){
          res.writeHead(500,err.message);
          res.end();
        }else{
          res.render('showTaags',{title:'Taag Listing',theTaags:theReturnedTaags});
        }
      });
	},

	showTaag: function(req, res){
    Taag.findOne({code:req.params.code},function(err, item) 
    {
      if(item)
        res.render('showTaag',{title: item.title , taag: item});
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
                  if (err){
                    console.log("error after save.");
                    console.log(err);
                    console.log(req.body.taag);
                    console.log(newTaag);
                    res.writeHead(500,err.message);
                    res.end();
                  }
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.write(JSON.stringify({isSuccessful:true,code:createdTaag.code}));
                  res.end();
              });
          }
      }
    });
	},

  editTaag: function(req, res){
    var taag = null;
    Taag.findOne({Code:req.params.code},function(err, item) 
    {
      taag = item;
    });
    res.render('editTaag', { title: 'Create/Edit a Taag', item: taag });
    //res.write('test response');
    //res.end();
  },

  getCode: function(req, res){
    var code = new Code().create();
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify({ code:code }));
    res.end();
  }
}