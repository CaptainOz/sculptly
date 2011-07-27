
console.log( '*** Starting Server ***' );

var http = require('http');
http.createServer(function(req,res){
    res.writeHead( 200, {'Content-Type':'text/plain'} );
    res.end( 'Hi\n' );
}).listen( 80, '127.0.0.1' );

console.log( '*** Server Started ***' );
