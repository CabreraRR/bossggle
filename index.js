var http = require('http');

http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type':'text/html'});
  response.end('<html><body><h1>DICKS</h1></body></html>');

}).listen(8081);

console.log('Node server running');
