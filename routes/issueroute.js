var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var Taag = mongoose.model('Taag');
var IdObject = require('mongoose').Types.ObjectId;

module.exports = IssueRoute;

function IssueRoute(){
}

IssueRoute.prototype = {
    saveIssue: function(req,res){
        Taag.findById(new IdObject(req.body.taagId),function(err,returnedTaag){
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
    },

    addIssue: function(req,res){
        console.log(req.body.taagId);

        if(req.body.taagId == '' || req.body.taagId == 'undefined' || req.body.taagId == null){
            res.writeHead(400, "The taagId submited is not valid.");
            res.end();
        }else{
            console.log("Returning issue_Add");
            res.render('issue_add', { taagId: req.body.taagId, layout: false});
        }
    }

}