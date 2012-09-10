var querydstring = require("querystring");

//If you don't have the modules please do these:
//Windows: Win+R -> npm install formidable
//Linux:   Shell -> npm install formidable
var formidable = require("formidable");
var fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called");

    var form = new formidable.IncomingForm();
    
    //Becaus i use windows 7(64bit). So i have to change the upload dir, or nodejs will upload the image into the temp dir(in C:). This mean i don't have power to mv it to ./img
    //http://cnodejs.org/topic/4f2b9a04aa8e490b110bfae2
    form.uploadDir = "img";

    console.log("about to parse");

    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "img/test.png");

        response.writeHead(200, {"Content-Type":"text/html"});
        response.write("received image:<br />");
        response.write("<img src='/show' />");
        response.end();
    });
}


function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("img/test.png", "binary", function(error, file){
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
