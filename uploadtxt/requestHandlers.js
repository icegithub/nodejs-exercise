var exec = require("child_process").exec;
var querystring = require("querystring");

//This lib is to solve to show image or do other things
var formidable = require("formidable");
var fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called");
    // var content = "empty";

    // exec("find /", function(error, stdout, stderr) {
    //     content = stdout;
    // });
    
    // return content;
    // function sleep(milliSeconds) {
    //     var startTime = new Date().getTime();
    //     while (new Date().getTime() < startTime + milliSeconds);
    // }
    // sleep(10000);
    // return "Hello, start.";
    // exec("find /", 
    //      { timeout: 10000, maxBuffer: 20000*24 }, 
    //      function(error, stdout, stderr) {
    //          response.writeHead(200, {"Content-Type":"text/plain"});
    //          response.write(stdout);
    //          response.end();
    //      });
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    //Below is uesd to upload images or oters 
    //'<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    // '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called");
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("You have sent the text:"+querystring.parse(postData).text);
    // response.write("You have sent the text:"+postData);
    response.end();
    // return "Hello, upload.";
}


function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("test.png", "binary", function(error, file){
        if(error) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error+"\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}


exports.start = start;
exports.upload = upload;
exports.show = show;
