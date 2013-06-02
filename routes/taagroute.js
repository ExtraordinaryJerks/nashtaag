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
    Taag.findOne({code:req.params.code.toLowerCase()},function(err, item) 
    {
      if(item){
        var videoItems = item.medias.filter(function(element,index,array){
          console.log(array);
          return (element.type == 'Video');
        });
        console.log(videoItems);
        var linkItems = item.medias.filter(function(element,index,array){
          return(element.type =='Link');
        });

        for (var i = videoItems.length - 1; i >= 0; i--) {
          var urlLib = require('url');
          var stringAsUrl = urlLib.parse(videoItems[i].url,true);
          var urlQuery = stringAsUrl.query;
          console.log(urlQuery);
          var videoId = urlQuery.v;
          videoItems[i].videoId = videoId;
        };
        res.render('showTaag',{title: item.title , taag: item,videos:videoItems,links:linkItems});
      }else{
        res.redirect('/')
      }
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
  },

  addIssue: function(req,res){
    console.log("Hello");
    Taag.findOne({code:req.body.code},function(err,returnedTaag){
      console.log(req.body.issueTitle);
      if(err){
        res.writeHead(500,err.message);
        res.end();
      }else{
        if(returnedTaag){
          var newIssue = new Issue();
          newIssue.title = req.body.issueTitle;
          newIssue.description = req.body.description;
          returnedTaag.issues.push(newIssue);
          returnedTaag.save(function(err){
            if(err){
              res.writeHead(500,'No taag found for that code');
              res.end();
            }else{
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({isSuccessful:true}));
              res.end();
            }
          });
        }else{
          res.writeHead(500,'No taag found for that code');
          res.end();
        }
      }
    });
  }
}