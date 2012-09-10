var http = require("http");
var url  = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        // console.log("Request received.");
        
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Receive POST data trunk '"+postDataChunk+"'.");
        });
        request.addListener("end", function() {
            route(pathname, handle, response, postData);
        })
        // route(pathname, handle, response);
    }
    http.createServer(onRequest).listen(9090);
    
    console.log("Server start....");
}

exports.start = start;