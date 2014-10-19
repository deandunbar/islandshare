//~ var sanitizer = require('sanitizer');

function random_color(){
var colors= ['Aqua', 'Black', 'Blue', 'Fuchsia', 'Gray', 'Green', 'Lime', 'Maroon', 'Navy', 'Olive', 'Orange', 'Purple', 'Red', 'Silver', 'Teal', 'White', 'Yellow', 'Azure', 'Blond', 'Pink'];
var color = colors[Math.floor(Math.random()*colors.length)];

return color;
}

function random_name(){
	 var names= ['Arrow','Assasin','Avenger','Blaze','Captain','Cyborg','Dark','Death', 'Demon','Doom','Doctor','Enigma','Fallen','Fate','Flame','Frozen','Ghost ','Great','Infinite', 'Killer','Knight','Mist','Neo','Nightmare', 'Outlaw', 'Romeo', 'Shark', 'Dexter', 'Jaguar', 'Zues' , 'Dog', 'Cat', 'Laptop'];
	 var namez = names[Math.floor(Math.random()*names.length)];
	 return namez;
}

function random_number(){
	
	var number = Math.floor((Math.random()*5000)+1); 
	
	return number;
}
window.onload = function() {

	var name_placeholder = random_color() +  random_name() + random_number();
	//alert("your name is now" + name_placeholder);
	document.getElementById("name").value = name_placeholder;
    var messages = [];
    var socket = io.connect('http://islandshare.rocks:8080/');
    //~ var socket = io.connect('localhost');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("chat_content");
    var chatboxscroll = document.getElementById("chat_scrollbox");
     var name = document.getElementById("name");
     var aboutus = document.getElementById("aboutus");
     var aboutusmessage = " Hello, This is Created by MIS Students . Yall know who This Is";
    //var name = name_placeholder;
    console.log("logging has begannnnnnn");
	//alert(random_color() +  random_name() + random_number());
	 //~ var html = '';
 //~ content.innerHTML = html;
	
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            //~ var html = content.innerHTML;
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                //html += messages[i].message + '<br />';
               // html += validator.blacklist(messages[i].message, "</>") + '<br /><hr>';
                html += validator.escape(messages[i].message) + '<br /><hr>';
            }
            content.innerHTML = html;
            chatboxscroll.scrollTop = chatboxscroll.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
    
    socket.on('usercount', function (data) {
        if(data.message) {
            messages.push(data);
            var count = '';
           count = data;
        } 
        else {
            console.log("There is a problem:", data);
        }
    });
    

 
    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            field.value = "";
            socket.emit('send', { message: text, username: name.value });
            console.log("connection sent");
        }
    };
 
    aboutus.onclick = function() {
        
          var html = content.innerHTML;
                html += '<b> Server :</b>';
                //html += messages[i].message + '<br />';
                html += aboutusmessage + "</>" + '<br /><hr>';
           
            content.innerHTML = html;
            chatboxscroll.scrollTop = chatboxscroll.scrollHeight;
            
        
    };
 
}
