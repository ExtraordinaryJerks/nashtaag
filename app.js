
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var mongoConnectionString = 'mongodb://nashtaag-demo:qYukGKevuazH9QexMwuBWHMD4oFe7NtLAuUQIoEaoyA-@ds045077.mongolab.com:45077/nashtaag-demo';

var TaagRoute = new require('./routes/taagroute');
var taagRoute = new TaagRoute(mongoConnectionString);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:code([A-Za-z\\d]+)', taagRoute.showTaag.bind(taagRoute));
app.get('/taag/edittaag', taagRoute.editTaag.bind(taagRoute));
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
