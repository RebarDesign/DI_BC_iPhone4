//document.body.appendChild(document.createElement('script')).src='js/script0.js';

//jQuery(document).load(myfunc)



var serverIp = "2.111.21.33";
var serverPort = "8080";


function networkFunction(){
			
			var ip=prompt("Please enter server IP", serverIp);
			
			serverIp = ip;
			
			var port=prompt("Please enter server port", serverPort);
			
			serverPort = port;
			
		}
		
function helpShow(){
			$('#helpImage').toggle();
			$('#settingsMenuOptions').hide();
}

function aboutAppFunction(){
			
		/*	$.get('https://github.com/RebarDesign/DI_Test_ServerAppV1/blob/master/README.md', function(contents) {
				  
			},'text');
		*/	
			alert("App Version 1.00 || Creator: Sebastian Florian || Rebar Design 2014");
	
			}
		

$(document).ready(function(){
	
		
		
		$('#helpImage').click(function(){
				$(this).hide();
				
		});  
		
		
		$('#sideMenu ul#floorChoice').click(function(){
			
			$('#sideMenu ul#floorChoice li').toggle("slow");
			
		})
		

	
		$('#settingsMenu img').click(function() {
		   $('#settingsMenuOptions').toggle("slow");
	
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
		
		
		var menuHidden='notHidden';

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