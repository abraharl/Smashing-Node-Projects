var colors = require('colors')

if(process.argv.length<3){
  var error = colors.red('Usage: node '+process.argv[1]+" <file path>");
  console.log(error);
  process.exit(1);
}

var fs = require('fs')
var util = require('util')

var filePath = process.argv[2];
var children = [];

init();

function init(){
  if(fs.lstatSync(filePath).isDirectory()){
    displayChildren(filePath);
  }
  else{
    displayContents(filePath);
  }
}

function displayChildren(directory){
	children = fs.readdirSync(directory);

	console.log("Please select an item by typing in the corresponding number.")
	for(var i=0;i<children.length;i++){	
		var l = i + 1;
		if(fs.lstatSync(filePath+"\\"+children[i]).isDirectory()){
			var output = colors.green("\\"+children[i]);
			console.log(l+") "+output);
		}
		else {console.log(l + ") " + children[i]);}
	}

	processCommand();

}

function displayContents(file){
  var read = fs.readFileSync(file,'utf8');
  console.log(read);
  process.exit(0);
}

function processCommand(){

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data',function(command){
  	command = command.replace(' ','');
    command = parseInt(command);

  	if(isNaN(command) || command<1 || command>children.length){
  		console.log('Invalid Option. Please enter another one.'.red);
  	}
    else{
      var selected = children[command-1];
      filePath = filePath + "\\"+selected;
      if(fs.lstatSync(filePath).isDirectory()){
        displayChildren(filePath);
      }
      else{
        displayContents(filePath);
      }
    }
  })
}