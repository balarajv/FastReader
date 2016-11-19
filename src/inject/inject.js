function launchWindow(id) {
	
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set heigth and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect		
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.90);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height());
		$(id).css('left', winW/2-$(id).width()/2);
	
		//transition effect
		$(id).fadeIn(2000); 
		console.log("laucnhging window");

}

wordLength  = 5;
wordsSpeed  = 100;
totalWords  = 0;
noWords     = 1;
paused      = false;
wordsPerMinute = wordsSpeed;
wordsPerSecond = wordsPerMinute/60; 
miliSecondsPerWord = 1000/wordsPerSecond;

function updateWordSpeed(keyCode){
	//paused = true;
    if(keyCode == 78){
        wordsPerMinute = wordsPerMinute + 30;
        wordsPerSecond = wordsPerMinute/60;
        miliSecondsPerWord = 1000/wordsPerSecond;
    }
    else if(keyCode == 66){
        if(wordsPerMinute >= 30){
            wordsPerMinute = wordsPerMinute - 30;
            wordsPerSecond = wordsPerMinute/60;
            miliSecondsPerWord = 1000/wordsPerSecond;
        }
    }
    miliSecondsPerWord = Math.round(miliSecondsPerWord);
}
$("#startRead").click(function(){
    startFlow();
});
function startFlow(){
    if(!paused)
    {
    	$("#dialog span").removeClass("text-show-color").addClass("text-hide-color");
    	showHide();
    }
}//end function startFlow(){
function showHide(){
	console.log(totalWords)
    if(noWords <= totalWords && !paused){
    	$("#dialog span").removeClass("text-show-color").addClass("text-hide-color");
        for(i = noWords; i < (noWords + wordLength); i++){
            $("#dialog span:eq("+i+")").removeClass("text-hide-color").addClass("text-show-color");
        }
        //noWords = i;        
        $("#dialog span:eq("+(i - 5)+")").removeClass("text-show-color").addClass("text-hide-color");
    	$("#dialog span:eq("+(i)+")").removeClass("text-hide-color").addClass("text-show-color");
        noWords++;
        setTimeout(showHide, miliSecondsPerWord);
    }
}//end function showHide(){

$(document).ready(function() {	
	
	//Put in the DIV id you want to display
	$("body").append('<div id="boxes"><div id="dialog" class="window"></div><div id="mask" />'); 

	
	//if close button is clicked
	$('.window #close').click(function () {
		$('#mask').hide();
		$('.window').hide();
	});		
	
	//if mask is clicked
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});			
	

	$(window).resize(function () {
	 
 		var box = $('#boxes .window');
 
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
      
        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
               
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center
        box.css('top',  winH/2 - box.height()/2);
        box.css('left', winW/2 - box.width()/2);
	 
	});	

	$(document).on("keyup" , function(event){
		
		console.log("key is pressed")
	    if(event.keyCode == 32){
	    	console.log("space is pressed");
	        paused = !paused;
	        if(!paused) showHide();
	    }
	    if(event.keyCode == 66){
	        updateWordSpeed(event.keyCode);
	    }
	    if(event.keyCode == 78){
	        updateWordSpeed(event.keyCode);
	    }  
	});	
	
});





chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});
chrome.extension.onMessage.addListener(
	function(request, sender) {
		if(request.action == "easyRead"){
				$.ajax({
					url: 'http://api.embed.ly/1/extract?key=7cb2e56465cf4fb6828de74b4125c90a&url='+request.tabURL,
					success: function(response){
						var $content = $(response.content);
						
						$content.find('p').each(function(){

							text = $(this).text().split(' ');
							for( var i = 0, len = text.length; i<len; i++ ) {
						    	text[i] = '<span class="text-show-color">'+text[i]+'</span>'; 
							}
							totalWords = totalWords + i;			
							text = '<p>' + text.join(' ') + '</p><br>';
							$("#dialog").append(text);
						});
						
						launchWindow("#dialog")
						if(request.speed == true){
							startFlow();
						}
					}
			});
/*			console.log("changing the backgroundColor");
			document.body.style.backgroundColor = "red";			*/
		}
	});

