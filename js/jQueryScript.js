//document.body.appendChild(document.createElement('script')).src='js/script0.js';

//jQuery(document).load(myfunc)



//var serverIp = "2.111.21.33";
var serverIp = "localhost";
var serverPort = "8080";
var menuHidden='notHidden';

function networkFunction(){
			
			var ip=prompt("Please enter server IP", serverIp);
			
			serverIp = ip;
			
			var port=prompt("Please enter server port", serverPort);
			
			serverPort = port;
			
		}
		
function helpShow(){
	
			$('#settingsMenuOptions').hide();
			$("#sideMenu").animate({'margin-right':'-160px'});
			$("#hideButton").removeClass('hideButton').addClass('hideButtonH');
			menuHidden='hidden';
			$('#helpImage').toggle('slow');
			$('#settingsMenuOptions').hide();
}



function aboutAppFunction(){
	
			$('#AboutApp').toggle('slow');
			$('#settingsMenuOptions').hide();
			$("#sideMenu").animate({'margin-right':'-160px'});
			$("#hideButton").removeClass('hideButton').addClass('hideButtonH');
			menuHidden='hidden';
			
			}
			
function resetSure(){
	
			$('#resetButton').toggle();
			$('#resetSure').hide();
			
			}
		

$(document).ready(function(){
	
		
		$("#closeAbout").click(function() {
			
			$('#AboutApp').hide('slow');
			
		});
			
		$('#helpImage').click(function(){
				$(this).hide();
				
		});  
		
		
		$('#sideMenu ul#floorChoice').click(function(){
			
			$('#sideMenu ul#floorChoice li').toggle("slow");
			$('#closeFloors').toggle('slow');
			
		})
		

	
		$('#settingsMenu img').click(function() {
		   $('#settingsMenuOptions').toggle("slow");
		   $('#resetSure').show();
		   $('#resetButton').hide();
	
		});
		
		
		var position='expanded';

		$("#output-id").click(function() {
		  if (position=='expanded') {
			$("#output-id").animate({height:'32px'});
			$("#output-id").animate({'margin-top':'-15px'});
			position='collapsed';
		  } else {
			  
			$("#output-id").animate({'margin-top':'-200px'});
			$("#output-id").animate({height:'200px'});
			position='expanded';
		  }
		});
		
		
		

		$("#hideButton").click(function() {
		  if (menuHidden=='notHidden') {
			$("#sideMenu").animate({'margin-right':'-160px'});
			$("#hideButton").removeClass('hideButton').addClass('hideButtonH');
			menuHidden='hidden';
		  } else {
			  
			$("#sideMenu").animate({'margin-right':'0px'});
			$("#hideButton").removeClass('hideButtonH').addClass('hideButton');
			menuHidden='notHidden';
		  }
		});
	
	})