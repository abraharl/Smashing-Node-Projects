var http = require('http');

console.log('server started');

http.createServer(function(req,res){
	if(req.url == '/'){
	  res.writeHead(200,{'Content-Type':'text/html'});
	  res.end(['<form method="POST" action="/url">',
		     '<h1>My Form</h1>',
		       '<fieldset>',
		       '<label>Personal Information</label>',
		       '<p>What is your name?</p>',
		       '<input type="text" name="name">',
		       '<p><button>Submit</button></p>',
		     '</form>'].join(''));
    }
    else if(req.url == '/url'){
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end('You sent a <em>'+req.method+'</em> request');
    }
}).listen(3001);