var express =  require('express');
var app = express();
var server = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(server);
var socket = require('./src/server/socket.js');

//var host = '172.16.5.33';
var host = 'localhost';
var port = 3000;

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

app.use('/',  express.static(__dirname + '/public'));
app.get('*', (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// app.use('/',  express.static(__dirname + '/node_modules'));

socket(io);

server.listen(port, host, function() {
    console.log('Listening on port %d %s Build Alert is online', server.address().port, host);
});
