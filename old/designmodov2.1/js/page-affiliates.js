jQuery(document).ready(function(){
	setInterval(function() { 
	  jQuery('.bubble-box:first').fadeOut(1000, function(){
		jQuery('.bubble-box:first').fadeIn(1000);
	  }).appendTo('.we-love');  
	},7000);
});