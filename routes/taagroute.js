var Code = require('../domain/codes.js');

var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var Media = mongoose.model('Media');
var Taag = mongoose.model('Taag');

module.exports = TaagRoute;

function TaagRoute(){
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
    if(req.body.taag.id == '' || req.body.taag.id == 'undefined' || req.body.taag.id == null){
      isNew = true;theId = null;
    }else{
      theId = req.body.taag.id;
    }
    Taag.findOne({code:req.body.taag.code.toLowerCase()},function(err, item) 
    {
      if (item != null && isNew){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ isSuccessful:false, code:req.body.taag.code, message:"The the code " + req.body.taag.code + " is already in use. Please use another." }));
        res.end();
        return;
      }
      var newTaag = new Taag(req.body.taag);
      var idObject = require('mongoose').Types.ObjectId;
      Taag.findById(new idObject(theId),
      function(err,foundTaag){
        if(err){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({isSuccessful:false,message:err.message}));
            res.end();
            return;
        }else{
            if(foundTaag){
                Taag.update({_id:new idObject(theId)},
                      newTaag,
                      function(err,updatedTaag){
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({isSuccessful:true,code:updatedTaag.code}));
                        res.end();
                        return;
                      });
            }else{
                newTaag.save(
                  function(err,createdTaag){
                    if (err){
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.write(JSON.stringify({isSuccessful:false,message:err.message}));
                      res.end();
                      return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({isSuccessful:true,code:createdTaag.code}));
                    res.end();
                    return;
                });
            }
        }
      });
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