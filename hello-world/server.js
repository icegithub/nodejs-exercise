var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello, world');
});

app.listen(9090);
console.log('listening on port 9090');
