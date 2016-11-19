getTabInfo = function(callback, speed){
	console.log("speed")
	console.log(speed)
	var queryInfo = {
	    active: true,
    	currentWindow: true
  	};

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    console.log("url is done ")
    callback(tabs[0].id, url, speed);
  });
}

openSpreedFromMenu =function(tabId, tabURL, speed){
	chrome.tabs.sendMessage(tabId, {action: "easyRead", "tabURL": tabURL, "speed":speed}, function(response) {
    	console.log("Easy read under progress");
 	});
}
$(document).ready(function(){
	$("#menu-link-easy-read").on("click", function(){
		chrome.runtime.sendMessage({action: "openSpreedFromMenu"}, getTabInfo(openSpreedFromMenu, false));
	});
	$("#menu-link-speed-read").on("click", function(){
		chrome.runtime.sendMessage({action: "openSpreedFromMenu"}, getTabInfo(openSpreedFromMenu, true));
	});
	$("#menu-link-listen").on("click", function(){
		
	});
	$("#menu-link-donate").on("click", function(){
		
	});
});