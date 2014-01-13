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
		
		
		var floorPostion = 'expanded';
		$('#sideMenu ul#floorChoice').click(function(){
			
			$('#sideMenu ul#floorChoice li').toggle("slow");
			
		})
		

	
		$('#settingsMenu img').click(function() {
		   $('#settingsMenuOptions').toggle("slow");
	
		});
		
		
		var position='expanded';

		$("#output-id h4").click(function() {
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
	
	})