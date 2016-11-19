// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender) {
  	if(request.action == "openSpreedFromMenu"){
  		console.log("connection established");
  		sender();
  		chrome.runtime.sendMessage({},function(){});
  	}
});
$.ajax({
	url: 'http://api.embed.ly/1/extract?key=7cb2e56465cf4fb6828de74b4125c90a&url=http://www.eenadu.net/Editorial/Mematainner.aspx?item=letter-1',
	success: function(response){
		$("#content").html(response.content);
		$("#content p").each(function(){
			var text = $(this).text().split(' ');
			for( var i = 0, len = text.length; i<len; i++ ) {
		    	text[i] = '<span class="text-show-color">'+text[i]+'</span>'; 
			}
			totalWords = totalWords + i;			
			console.log(text);
			$(this).html(text.join(' '));
		});
	}
});
