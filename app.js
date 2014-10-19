var express = require("express");
var app = express();
var port = 8080;
var exec = require('child_process').exec
var util = require('util')
var fs = require('fs')
var Files = {};
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));


var siofu = require("socketio-file-upload");
//~ var app = express()
    //~ .use(siofu.router)
    //~ .listen(port);
    

app.use(express.static(__dirname + '/public'));
app.use(siofu.router);


app.get("/", function(req, res){
    res.send("It works!");
    
});
 

 
//app.listen(port);
//~ var io = require('socket.io').listen(app.listen(port));
//~ var io = require('socket.io');
var io = require('socket.io').listen(app.listen(port));

io.on("connection", function(socket){
    var uploader = new siofu();
    uploader.dir = "./temp";
    uploader.listen(socket);
    console.log("connection new");
    uploader.on("error", function(event){
	    console.log("Error from uploader", event);
	});

});


console.log("Listening on port " + port);
