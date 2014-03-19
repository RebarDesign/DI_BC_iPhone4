$(document).ready(function(){
	
	$('#troubleshootingGuide').click(function(){
		$( "#initialMenu" ).show();
		$( ".breadcrumbs" ).hide();
		$( "#installAppContent" ).hide();
	});
	
	$('#startView').click(function(){
		$( "#initialMenu" ).show();
		$( ".breadcrumbs" ).hide();
		$( "#installAppContent" ).hide();
		$( "#blindMalfunctionContent" ).hide();
	});
	
	$('#mInstallApp').click(function(){
		$( "#initialMenu" ).hide();
		$( "#installAppContent").show();
		$(".breadcrumbs li:has('a'):contains('Install')").remove();
		$(".breadcrumbs li:has('a'):contains('Blind')").remove();
		$(".breadcrumbs").append('<li class="current"><a href="#">Install App On New Phone</a></li>');
		$( ".breadcrumbs" ).show();
		  
	});
	
	$('#mBlindMalfunction').click(function(){
		$( "#initialMenu" ).hide();
		
		$( "#blindMalfunctionContent").show();
		$( "#blindMalfunctionMenuO101").hide();
		$( "#blindMalfunctionMenu").show();
		
		$(".breadcrumbs li:has('a'):contains('Install')").remove(); /*removes li with that word*/
		$(".breadcrumbs li:has('a'):contains('Blind')").remove();
		$(".breadcrumbs").append('<li class="current"><a href="#">Blind Malfunction</a></li>');
		$( ".breadcrumbs" ).show();
	});
	
	$('#bkBlindMalfunctionMenu').click(function(){
		$( "#initialMenu" ).hide();
		
		$( "#blindMalfunctionContent").show();
		$( "#blindMalfunctionMenuO101").hide();
		$( "#blindMalfunctionMenu").show();
		
		$(".breadcrumbs li:has('a'):contains('Install')").remove(); /*removes li with that word*/
		$(".breadcrumbs li:has('a'):contains('Blind')").remove();
		$(".breadcrumbs").append('<li class="current"><a href="#">Blind Malfunction</a></li>');
		$( ".breadcrumbs" ).show();
	});
	
	$('#blindMalfunctionMenuO1').click(function(){
		$( "#blindMalfunctionMenu").hide();
		$( "#blindMalfunctionMenuO101").show('fast');
		$(".breadcrumbs li:has('a'):contains('Install')").remove(); /*removes li with that word*/
		$(".breadcrumbs li:has('a'):contains('Blind')").remove();
		$(".breadcrumbs").append('<li id="bkBlindMalfunction"><a>Blind Malfunction</a></li><li class="current"><a href="#">Blind Not Responding</a></li>');
		$( ".breadcrumbs" ).show();
	});
	
	$(".breadcrumbs").on("click", "#bkBlindMalfunction", function(){
      	$( "#initialMenu" ).hide();
		
		$( "#blindMalfunctionContent").show();
		$( "#blindMalfunctionMenuO101").hide();
		$( "#blindMalfunctionMenu").show();
		
		$(".breadcrumbs li:has('a'):contains('Install')").remove(); /*removes li with that word*/
		$(".breadcrumbs li:has('a'):contains('Blind')").remove();
		$(".breadcrumbs").append('<li class="current"><a href="#">Blind Malfunction</a></li>');
		$( ".breadcrumbs" ).show();
  });
		
	
	$("#bUDID").on("click", function(){
		
		var udid = $('#udidU').val();
		var name = $('#udidN').val();
		var appended  = 'mailto:rebardesigndk@gmail.com?cc=mail@hagen.dk&subject=Add device to app permissions - DI &body=New phone ready for pairing with UDID: ' + udid + '. Ordered by by: ' + name ;
		
		 $('#bUDID').attr('href', appended);
		 $('#bUDID').trigger("click");
		 });
		   
})