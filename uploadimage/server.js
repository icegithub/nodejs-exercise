var http = require("http");
var url  = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(pathname, handle, response, request);
    }
    http.createServer(onRequest).listen(9090);
    
    console.log("Server start....");
}

exports.start = start;
