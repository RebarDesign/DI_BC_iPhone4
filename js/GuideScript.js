/* Text Content */ 

var M1 = new Array('Blind Malfunction' , 'M1' );
	var M1A = new Array('Blind Not Responding' , 'M1A' );
		var M1A1 = new Array('Single Blind' , 'M1A1' );
		var M1A2 = new Array('Mutiple Blinds' , 'M1A2' );
		var M1A3 = new Array('Whole Room' , 'M1A3' );
		var M1A4 = new Array('All Blinds' , 'M1A4' );
	var M1B = new Array('Blind Abnormal Behaviour' , 'M1B' );
		var M1B1 = new Array('Running and stopping after a few seconds' , 'M1B1' );
		var M1B2 = new Array('Blind stopping before top' , 'M1B2' );
		var M1B3 = new Array('Blind motor making loud noise' , 'M1B3' );
		var M1B4 = new Array('Blind tilts but does not lift' , 'M1B4' );
		var M1B5 = new Array('Blind goes up when should go down' , 'M1B5' );
	var M1C = new Array('Other' , 'M1C' );
	
	
var M2 = new Array('Install App On Phone' , 'M2');

var M3 = new Array('System Description' , 'M3');
	var M3A = new Array('Simbus KNX System' , 'M3A' );
	var M3B = new Array('Persienner App' , 'M3B' );

/* Adding text to HTML */ 
function start(){
		
	$("#Content").append('<a id="' + M1[1] + '" class="button radius expand">' + M1[0] + '</a>');
		$("#Content").append('<a id="' + M1A[1] + '" class="button radius expand">' + M1A[0] + '</a>');
			$("#Content").append('<a id="' + M1A1[1] + '" class="button radius expand">' + M1A1[0] + '</a>');
			$("#Content").append('<a id="' + M1A2[1] + '" class="button radius expand">' + M1A2[0] + '</a>');
			$("#Content").append('<a id="' + M1A3[1] + '" class="button radius expand">' + M1A3[0] + '</a>');
			$("#Content").append('<a id="' + M1A4[1] + '" class="button radius expand">' + M1A4[0] + '</a>');
		$("#Content").append('<a id="' + M1B[1] + '" class="button radius expand">' + M1B[0] + '</a>');
			$("#Content").append('<a id="' + M1B1[1] + '" class="button radius expand">' + M1B1[0] + '</a>');
			$("#Content").append('<a id="' + M1B2[1] + '" class="button radius expand">' + M1B2[0] + '</a>');
			$("#Content").append('<a id="' + M1B3[1] + '" class="button radius expand">' + M1B3[0] + '</a>');
			$("#Content").append('<a id="' + M1B4[1] + '" class="button radius expand">' + M1B4[0] + '</a>');
			$("#Content").append('<a id="' + M1B5[1] + '" class="button radius expand">' + M1B5[0] + '</a>');
		$("#Content").append('<a id="' + M1C[1] + '" class="button radius expand">' + M1C[0] + '</a>');
			$("#Content").append('<a id="' + M1C1[1] + '" class="button radius expand">' + M1C1[0] + '</a>');
		
		
	$("#Content").append('<a id="' + M2[1] + '" class="button radius expand">' + M2[0] + '</a>');	
	$("#Content").append('<a id="' + M3[1] + '" class="button radius expand">' + M3[0] + '</a>');
		$("#Content").append('<a id="' + M3A[1] + '" class="button radius expand">' + M3A[0] + '</a>');
		$("#Content").append('<a id="' + M3B[1] + '" class="button radius expand">' + M3B[0] + '</a>');
	
	
	
	};
	
function homeMenu(){
	$(".breadcrumbs li").remove();
	$(".breadcrumbs").hide();
	$('#Content a').hide();
	$('#installAppContent').hide();
	$('#simbusDescription').hide();
	$('#appDescription').hide();
	$('#M1A1A').hide();
	$('#M1A2A').hide();
	$('#M1A3A').hide();
	$('#M1A4A').hide();
	$('#M1B1A').hide();
	$('#M1B2A').hide();
	$('#M1B3A').hide();
	$('#M1B4A').hide();
	$('#M1B5A').hide();
	$('#M1C1').hide();
	$('#M1').show();
	$('#M2').show();
	$('#M3').show();	
	};
	
	

$(document).ready(function(){
	
	start();
	
	homeMenu();
	
	$(".breadcrumbs").on("click", "li" ,  function(){
		 var trimmed = $(this).attr('id').substring(1);
		 var myId = '#' + trimmed;
		 
		 if (myId == "#Home" ) homeMenu()
		 
		 else $( myId ).trigger( "click" );
		 
		});
		
	$('#M1').click(function(){
			$('#Content a').hide();	
			$('table').hide();
				$(".breadcrumbs li").remove();
				$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
				$(".breadcrumbs").append('<li class="current"><a href="#">' + M1[0] + '</a></li>');
				$( ".breadcrumbs").show();			
			$('#M1A').show();
			$('#M1B').show();
			$('#M1C').show();
		});
		
	$('#M1A').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1A[0] + '</a></li>');
					$( ".breadcrumbs").show();			
				$('#M1A1').show();
				$('#M1A2').show();
				$('#M1A3').show();
				$('#M1A4').show();
			});
			
			$('#M1A1').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1A" ><a href="#">' + M1A[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1A1[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1A1A ').show();			
			$('#M1A1A table').show();
			});
			
			$('#M1A2').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1A" ><a href="#">' + M1A[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1A2[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1A2A').show();
			$('#M1A2A table').show();
			});
			
			$('#M1A3').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1A" ><a href="#">' + M1A[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1A3[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1A3A').show();
			$('#M1A3A table').show();
			});
			
			$('#M1A4').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1A" ><a href="#">' + M1A[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1A4[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1A4A').show();
			$('#M1A4A table').show();
			});
			
	$('#M1B').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1B[0] + '</a></li>');
					$( ".breadcrumbs").show();			
				$('#M1B1').show();
				$('#M1B2').show();
				$('#M1B3').show();
				$('#M1B4').show();
				$('#M1B5').show();
			});
			
			$('#M1B1').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1B" ><a href="#">' + M1B[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1B1[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1B1A ').show();			
			$('#M1B1A table').show();
			});
			
			$('#M1B2').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1B" ><a href="#">' + M1B[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1B2[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1B2A').show();
			$('#M1B2A table').show();
			});
			
			$('#M1B3').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1B" ><a href="#">' + M1B[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1B3[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1B3A').show();
			$('#M1B3A table').show();
			});
			
			$('#M1B4').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1B" ><a href="#">' + M1B[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1B4[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1B4A').show();
			$('#M1B4A table').show();
			});
			
			$('#M1B5').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li id="bM1B" ><a href="#">' + M1B[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1B5[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$('#M1B5A').show();
			$('#M1B5A table').show();
			});
			
	$('#M1C').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM1" ><a href="#">' + M1[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M1C[0] + '</a></li>');
					$( ".breadcrumbs").show();			
				$('#M1C1').show();
				$('#M1C1 table').show();
			});
		
	$('#M2').click(function(){
			$('#Content a').hide();
			$('table').hide();
			$(".breadcrumbs li").remove();
				$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
				$(".breadcrumbs").append('<li class="current"><a href="#">' + M2[0] + '</a></li>');
				$( ".breadcrumbs").show();			
			$("#installAppContent").show();
		});
		
	$('#M3').click(function(){
			$('#Content a').hide();
			$('table').hide();
			$("#simbusDescription").hide();
			$("#appDescription").hide();
			$(".breadcrumbs li").remove();
				$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
				$(".breadcrumbs").append('<li class="current"><a href="#">' + M3[0] + '</a></li>');
				$( ".breadcrumbs").show();			
			$('#M3A').show();
			$('#M3B').show();
		});
			$('#M3A').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM3" ><a href="#">' + M3[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M3A[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$("#simbusDescription").show();
			});
			
			$('#M3B').click(function(){
				$('#Content a').hide();	
			$('table').hide();
					$(".breadcrumbs li").remove();
					$(".breadcrumbs").append('<li id="bHome"><a href="#">Home</a></li>');
					$(".breadcrumbs").append('<li id="bM3" ><a href="#">' + M3[0] + '</a></li>');					
					$(".breadcrumbs").append('<li class="current"><a href="#">' + M3B[0] + '</a></li>');
					$( ".breadcrumbs").show();			
			$("#appDescription").show();
			});
	
	
	$("#bUDID").on("click", function(){
		
		var udid = $('#udidU').val();
		var name = $('#udidN').val();
		var appended  = 'mailto:rebardesigndk@gmail.com?cc=mail@hagen.dk&subject=Add device to app permissions - DI &body=New phone ready for pairing with UDID: ' + udid + '. Ordered by by: ' + name ;
		
		 $('#bUDID').attr('href', appended);
		 $('#bUDID').trigger("click");
		 });	
})
