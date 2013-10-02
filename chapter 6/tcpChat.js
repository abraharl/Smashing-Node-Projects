var colors = require('colors');
var net = require('net');

var count = 0;
var users = {};

//create new tcp connection
var server = net.createServer(function(conn){
  var nickname;
  
  conn.setEncoding('utf8');
  conn.write('Welcome to node chat!\r\n'+count+' other people are connected at this time.\r\nPlease enter your name and press enter: ');

  conn.on('data', function(data){
  	data = data.replace('\r\n','');
  	data = data.replace('\n','');

    if(data == null || data == ''){
    	return;
    }

    if(!nickname){
    	if(users[data]){
    		conn.write('The nickname is already in use. Please try again: ');
    		return;
    	}
    	else{
    		nickname = data;
    		users[nickname] = conn;

    		for(var i in users){
    		  users[i].write(nickname+' joined the room\r\n');
    		}
    	}
    }
    else{
      for(var i in users){
      	users[i].write(nickname+': '+data+'\r\n');
      }
    }
  });

  conn.on('close', function(){
    count--;
    delete users[nickname];
  });

  count++;
});

server.listen(3000, function(){
	console.log('\033[96m server listening on port *:3000\033[39m');
});