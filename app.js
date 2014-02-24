
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var photo = require('./routes/photo');
var collections = require('./routes/collections');
var tags = require('./routes/tags');
var artists = require('./routes/artists');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.set('title', 'SnapStock.au');

app.get('/', routes.index);
app.get('/api/photos', photo.index);
app.post('/api/collections', collections.create);
app.get('/api/collections', collections.index);
app.get('/api/collections/:id', collections.find);
app.get('/api/tags', tags.index);
app.get('/api/tags/:id', tags.find);
app.get('/api/artists', artists.index);
app.get('/api/artists/:id', artists.find);
app.post('/artists/:id/edit', artists.update);
app.get('/api/artists/:id/collections', artists.collections);
app.post('/api/artists', artists.create);
app.post('/api/login', artists.login);
app.get('/api/logout', artists.logout);
app.get('/api/session', artists.session);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
