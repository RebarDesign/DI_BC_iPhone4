function init() {
			 
			 map = new OpenLayers.Map('map' , {
				 controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ArgParser(),
            new OpenLayers.Control.Attribution()]		 
			});
										
			var Sal0 = new OpenLayers.Layer.Image(
				'Sal 0',
				'img/GroundFloorPlan.jpg',
				new OpenLayers.Bounds(-512, -238, 512, 238),
				new OpenLayers.Size(512, 238),
				{numZoomLevels: 7}
				); 
				
			var vectorLayer = new OpenLayers.Layer.Vector("Vector Layer", 
				{
					styleMap: new OpenLayers.StyleMap(
					{
						 "default": new OpenLayers.Style({
						fillColor: '#CDDCDC',
						fillOpacity:  0.4,
						strokeWidth: 1.5,
						strokeColor: '#ADADAD',
   						label: "${key}",
        				labelOffsetY: 20,
						fontColor: "#c3c3c3",
						fontSize: "11",
        				fontFamily: "Helvetica",
						strokeOpacity: 0.6,
						strokeDashstyle: 'solid',
						title: 'blindIcon'
					}),
					
					   "select": new OpenLayers.Style({
						fillColor: '#8FD0E0',
						fillOpacity:  0.6,
						strokeWidth: 2,
						strokeColor: '#CEFFFE',
						strokeOpacity: 0.6,
						strokeDashstyle: 'dash',
						title: 'blindIcon_select'
					}) 
					}
					
					) 
					
					
				});
				
				
				
				// Room Label Style
				
						
					
				var textLabels = new OpenLayers.Layer.Vector("Text Label Layer", 
				{
					styleMap: new OpenLayers.StyleMap(
					{
						 "default": new OpenLayers.Style({
						fillOpacity:  0,
						label: "${key}",
        				labelOffsetY: 20,
						strokeWidth: 1,
						strokeOpacity:0.4,
						fontColor: "#F0F0F0",
						fontSize: "15",
        				fontFamily: "Helvetica",
						title: 'blindIcon'
					}),
					
					   "select": new OpenLayers.Style({	
						fillOpacity:  0,
						title: 'blindIcon_select'
					})
					})
				});
			 
			
			// ADD TO SELECTED BLINDS [[[[
			//////////////////////////////
			
			function recordToDiv(feature) {
				
				
				var id = feature.attributes.key;
				var nbBlinds = feature.attributes.nbB;
				var fstBlind = feature.attributes.fstB - 1;
				var lastB = fstBlind + nbBlinds + 1;
				
				if (!isNaN(id)){
				//var output = "Blind: " + id;
				//document.getElementById("output-id").innerHTML = output;
				$("#output-id ul").append('<li id="blind' + id + '"><p>Glas ' + id + '</p></li>');
				}
				
				else {
					
					
					for(var f=0;f<vectorLayer.features.length;f++)
						{
							var feature = vectorLayer.features[f];
							var id = feature.attributes.key;
							
							if(id>fstBlind&&id<lastB) {	
								if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1){}
								else {selectStuff.select(feature);}
								}
					}
					
				}
			}
			
			function eraseFromDiv(feature) {
				var id = feature.attributes.key;
				var nbBlinds = feature.attributes.nbB;
				var fstBlind = feature.attributes.fstB - 1;
				var lastB = fstBlind + nbBlinds + 1;
				
				if (!isNaN(id)){
				//var output = "Blind: " + id;
				//document.getElementById("output-id").innerHTML = output;
				$( '#blind' + id).remove();
				}
				
				else  {
					
					for(var f=0;f<vectorLayer.features.length;f++)
						{
							var feature = vectorLayer.features[f];
							var id = feature.attributes.key;
							
							if(id>fstBlind&&id<lastB) {	$( '#blind' + id).remove();
										selectStuff.unselect(feature); 
							}
						}
				}
						
			}
			
			
			// Deselect All // 
			
			$('#output-id img').click(function(){			
				
				deselectAll();
				
				});

			
			function deselectAll() {
				
				
				for(var f=0;f<vectorLayer.features.length;f++)
					{
						var feature = vectorLayer.features[f];
						selectStuff.unselect(feature);
					
					
					}
				
			}
			
			////////////////////////////////////
			
			
			//=================Controls======//
			
			function sendToUp() {
				
				
				
				for(var f=0;f<vectorLayer.features.length;f++){
					
					
					//if (vectorLayer.styleMap.styles == "selected"){
						
						var id = vectorLayer.features[f].attributes.key;
						var roomId = vectorLayer.features[f].attributes.room;
						
						if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1 ){
							
							//alert( "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/up/1/" + roomId + "/"+id );
							
				$.ajax({
						  type: "GET",
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/up/0/" + roomId + "/"+id
						  })
						   .done(function( data ) {
							   console.log("command sent to server");
							   })
						   .fail( function(xhr, textStatus, errorThrown) { 
								alert(textStatus);  
							});
				
						}
				}
			}
			
			function sendToStop() {
				
				
				
				for(var f=0;f<vectorLayer.features.length;f++){
					
					
					//if (vectorLayer.styleMap.styles == "selected"){
						var id = vectorLayer.features[f].attributes.key;
						var roomId = vectorLayer.features[f].attributes.room;
						
						if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1 ){
							//alert( "Blind " + id +  " STOP" );
							$.ajax({
						  type: "GET",
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/stop/0/" + roomId + "/"+id 
						  })
						   .done(function( data ) {
							   console.log("command sent to server");
							   })
						   .fail( function(xhr, textStatus, errorThrown) { 
								alert(textStatus);  
							});
						
						}
				}
			}
			
			function sendToDown() {
				
				
				
				for(var f=0;f<vectorLayer.features.length;f++){
					
					
					//if (vectorLayer.styleMap.styles == "selected"){
						var id = vectorLayer.features[f].attributes.key;
						var roomId = vectorLayer.features[f].attributes.room;
						
						if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1 ){
							//alert( "Blind " + id +  " going DOWN" );
							$.ajax({
						  type: "GET",
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/down/0/" + roomId + "/"+id 
						  })
						   .done(function( data ) {
							   console.log("command sent to server");
							   })
						   .fail( function(xhr, textStatus, errorThrown) { 
								alert(textStatus);  
							});
						
						}
				}
			}
			
			$('#upButton').click(function(){				
				
				sendToUp();
				
				});
				
			$('#stopButton').click(function(){				
				
				sendToStop();
				
				});
				
			$('#downButton').click(function(){				
				
				sendToDown();
				
				});
			
			
			////////////////////////////
			// Blind and Test Functions //
			///////////////////////////
			
			
			function createBlind (blindName , number, x, y, roomNumber) {
					blindName = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
										new OpenLayers.Geometry.Point(x, y),
										6,
										4
									));			
									
									blindName.attributes = {
									  key: number , 
			  						  room: roomNumber
									};	
									
				    vectorLayer.addFeatures([blindName]);
				}
				
			function createLabel (roomName, x, y, nbOfBlinds, firstBlind, width, height) {
								var p1 = new OpenLayers.Geometry.Point(x+width, y-height);
								var p2 = new OpenLayers.Geometry.Point(x+width, y+height);
								var p3 = new OpenLayers.Geometry.Point(x-width, y+height);
								var p4 = new OpenLayers.Geometry.Point(x-width, y-height);			
								var pnt= [];
								pnt.push(p1,p2,p3,p4);			
								var ln = new OpenLayers.Geometry.LinearRing(pnt);
								//Final Text			
								var roomName = new OpenLayers.Feature.Vector(ln, {key: roomName, nbB: nbOfBlinds, fstB: firstBlind, fontSize: map.getZoom()},  null);
								textLabels.addFeatures([roomName]);
				}	
				
			//////// Rooms /////////
			
			/////////////////
			// ROOM A0001 //
			/////////////////	
			
			var A0001Data = new Array(
			/*R Nb[0]:*/ "A0001X",/*Name[1]:*/"DR Studio",/*Nb of Bl[2]:*/ 10,/* X[3]:*/ -480 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 11 ,/*1st Bl[6]*/ 1);
				
					createBlind ( 'blind01', '1' , A0001Data[3] , A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind02', '2' , A0001Data[3] + A0001Data[5] , A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind03', '3' , A0001Data[3] + A0001Data[5]*2, A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind04', '4' , A0001Data[3] + A0001Data[5]*3, A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind05', '5' , A0001Data[3] + A0001Data[5]*4, A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind06', '6' , A0001Data[3] + A0001Data[5]*5, A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind07', '7' , A0001Data[3] + A0001Data[5]*6, A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind08', '8' , A0001Data[3] + A0001Data[5]*7, A0001Data[4] , A0001Data[0]);
					createBlind ( 'blind09', '9' , A0001Data[3] + A0001Data[5]*8, A0001Data[4] , A0001Data[0]); 
					createBlind ( 'blind10', '10' , A0001Data[3] + A0001Data[5]*9, A0001Data[4] , A0001Data[0]);//Width. Height//
					createLabel ( A0001Data[1] , A0001Data[3] + 40, A0001Data[4] - 20, A0001Data[2], A0001Data[6], 30 , 4);
					
			
			
			/////////////////
			// ROOM A0013 //
			/////////////////	
			
			var A0013Data = new Array(
			/*R[0]:*/ "A1013",/*Name[1]:*/"Certifikat",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ -353 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 11);
				
					createBlind ( 'blind11', '11' , A0013Data[3] , A0013Data[4] , A0013Data[0]);
					createBlind ( 'blind12', '12' , A0013Data[3] + A0013Data[5] , A0013Data[4] , A0013Data[0]);
					createBlind ( 'blind13', '13' , A0013Data[3] + A0013Data[5]*2, A0013Data[4] , A0013Data[0]);
					createBlind ( 'blind14', '14' , A0013Data[3] + A0013Data[5]*3, A0013Data[4] , A0013Data[0]); //Width. Height//
					createLabel ( A0013Data[1] , A0013Data[3] + 13, A0013Data[4] - 40, A0013Data[2], A0013Data[6], 14 , 4);
			
			
			/////////////////
			// ROOM A0017 //
			/////////////////	
			
			var A0017Data = new Array(
			/*R[0]:*/ "A0017",/*Name[1]:*/"Et",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ -230 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 15);
				
					createBlind ( 'blind15', '15' , A0017Data[3] , A0017Data[4] , A0017Data[0]);
					createBlind ( 'blind16', '16' , A0017Data[3] + A0017Data[5] , A0017Data[4] , A0017Data[0]);
					createBlind ( 'blind17', '17' , A0017Data[3] + A0017Data[5]*2, A0017Data[4] , A0017Data[0]);
					createBlind ( 'blind18', '18' , A0017Data[3] + A0017Data[5]*3, A0017Data[4] , A0017Data[0]); //Width. Height//
					createLabel ( A0017Data[1] , A0017Data[3] + 13, A0017Data[4] - 20, A0017Data[2], A0017Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0001 //
			/////////////////	
			
			var B0001Data = new Array(
			/*R[0]:*/ "B0001",/*Name[1]:*/"Tre",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ -176 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 19);
				
					createBlind ( 'blind19', '19' , B0001Data[3] , B0001Data[4] , B0001Data[0]);
					createBlind ( 'blind20', '20' , B0001Data[3] + B0001Data[5] , B0001Data[4] , B0001Data[0]);
					createBlind ( 'blind21', '21' , B0001Data[3] + B0001Data[5]*2, B0001Data[4] , B0001Data[0]);
					createBlind ( 'blind22', '22' , B0001Data[3] + B0001Data[5]*3, B0001Data[4] , B0001Data[0]);
					createBlind ( 'blind23', '23' , B0001Data[3] + B0001Data[5]*4, B0001Data[4] , B0001Data[0]);  //Width. Height//
					createLabel ( B0001Data[1] , B0001Data[3] + 17, B0001Data[4] - 40, B0001Data[2], B0001Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0006 //
			/////////////////	
			
			var B0006Data = new Array(
			/*R[0]:*/ "B0006",/*Name[1]:*/"Fem",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ -114 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 24);
				
					createBlind ( 'blind24', '24' , B0006Data[3] , B0006Data[4] , B0006Data[0]);
					createBlind ( 'blind25', '25' , B0006Data[3] + B0006Data[5] , B0006Data[4] , B0006Data[0]);
					createBlind ( 'blind26', '26' , B0006Data[3] + B0006Data[5]*2, B0006Data[4] , B0006Data[0]);
					createBlind ( 'blind27', '27' , B0006Data[3] + B0006Data[5]*3, B0006Data[4] , B0006Data[0]);  //Width. Height//
					createLabel ( B0006Data[1] , B0006Data[3] + 14, B0006Data[4] - 20, B0006Data[2], B0006Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0010 //
			/////////////////	
			
			var B0010Data = new Array(
			/*R[0]:*/ "B0010",/*Name[1]:*/"Syv",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ -61 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 28);
				
					createBlind ( 'blind28', '28' , B0010Data[3] , B0010Data[4] , B0010Data[0]);
					createBlind ( 'blind29', '29' , B0010Data[3] + B0010Data[5] , B0010Data[4] , B0010Data[0]);
					createBlind ( 'blind30', '30' , B0010Data[3] + B0010Data[5]*2, B0010Data[4] , B0010Data[0]);
					createBlind ( 'blind31', '31' , B0010Data[3] + B0010Data[5]*3, B0010Data[4] , B0010Data[0]);
					createBlind ( 'blind32', '32' , B0010Data[3] + B0010Data[5]*4, B0010Data[4] , B0010Data[0]);  //Width. Height//
					createLabel ( B0010Data[1] , B0010Data[3] + 17, B0010Data[4] - 40, B0010Data[2], B0010Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0015 //
			/////////////////	
			
			var B0015Data = new Array(
			/*R[0]:*/ "B0015",/*Name[1]:*/"Ni",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 5 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 33);
				
					createBlind ( 'blind33', '33' , B0015Data[3] , B0015Data[4] , B0015Data[0]);
					createBlind ( 'blind34', '34' , B0015Data[3] + B0015Data[5] , B0015Data[4] , B0015Data[0]);
					createBlind ( 'blind35', '35' , B0015Data[3] + B0015Data[5]*2, B0015Data[4] , B0015Data[0]);
					createBlind ( 'blind36', '36' , B0015Data[3] + B0015Data[5]*3, B0015Data[4] , B0015Data[0]);  //Width. Height//
					createLabel ( B0015Data[1] , B0015Data[3] + 13, B0015Data[4] - 20, B0015Data[2], B0015Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0019 //
			/////////////////	
			
			var B0019Data = new Array(
			/*R[0]:*/ "B0019",/*Name[1]:*/"Elleve",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 117 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 37);
				
					createBlind ( 'blind37', '37' , B0019Data[3] , B0019Data[4] , B0019Data[0]);
					createBlind ( 'blind38', '38' , B0019Data[3] + B0019Data[5] , B0019Data[4] , B0019Data[0]);
					createBlind ( 'blind39', '39' , B0019Data[3] + B0019Data[5]*2, B0019Data[4] , B0019Data[0]);
					createBlind ( 'blind40', '40' , B0019Data[3] + B0019Data[5]*3, B0019Data[4] , B0019Data[0]);  //Width. Height//
					createLabel ( B0019Data[1] , B0019Data[3] + 13, B0019Data[4] - 40, B0019Data[2], B0019Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0023a //
			/////////////////	
			
			var B0023aData = new Array(
			/*R[0]:*/ "B0023a",/*Name[1]:*/"Tretten",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ 174 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 41);
				
					createBlind ( 'blind41', '41' , B0023aData[3] , B0023aData[4] , B0023aData[0]);
					createBlind ( 'blind42', '42' , B0023aData[3] + B0023aData[5] , B0023aData[4] , B0023aData[0]);
					createBlind ( 'blind43', '43' , B0023aData[3] + B0023aData[5]*2, B0023aData[4] , B0023aData[0]);
					createBlind ( 'blind44', '44' , B0023aData[3] + B0023aData[5]*3, B0023aData[4] , B0023aData[0]);
					createBlind ( 'blind45', '45' , B0023aData[3] + B0023aData[5]*4, B0023aData[4] , B0023aData[0]);  //Width. Height//
					createLabel ( B0023aData[1] , B0023aData[3] + 17, B0023aData[4] - 20, B0023aData[2], B0023aData[6], 14 , 4);
			
			/////////////////
			// ROOM B0023b //
			/////////////////	
			
			var B0023Data = new Array(
			/*R[0]:*/ "B0023",/*Name[1]:*/"Femten",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 237 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 46);
				
					createBlind ( 'blind46', '46' , B0023Data[3] , B0023Data[4] , B0023Data[0]);
					createBlind ( 'blind47', '47' , B0023Data[3] + B0023Data[5] , B0023Data[4] , B0023Data[0]);
					createBlind ( 'blind48', '48' , B0023Data[3] + B0023Data[5]*2, B0023Data[4] , B0023Data[0]);
					createBlind ( 'blind49', '49' , B0023Data[3] + B0023Data[5]*3, B0023Data[4] , B0023Data[0]);//Width. Height//
					createLabel ( B0023Data[1] , B0023Data[3] + 13, B0023Data[4] - 40, B0023Data[2], B0023Data[6], 14 , 4);
			
			/////////////////
			// ROOM B0032a //
			/////////////////	
			
			var B0032aData = new Array(
			/*R[0]:*/ "B0032a",/*Name[1]:*/"Sytten",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ 291 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 50);
				
					createBlind ( 'blind50', '50' , B0032aData[3] , B0032aData[4] , B0032aData[0]);
					createBlind ( 'blind51', '51' , B0032aData[3] + B0032aData[5] , B0032aData[4] , B0032aData[0]);
					createBlind ( 'blind52', '52' , B0032aData[3] + B0032aData[5]*2, B0032aData[4] , B0032aData[0]);
					createBlind ( 'blind53', '53' , B0032aData[3] + B0032aData[5]*3, B0032aData[4] , B0032aData[0]);
					createBlind ( 'blind54', '54' , B0032aData[3] + B0032aData[5]*4, B0032aData[4] , B0032aData[0]);//Width. Height//
					createLabel ( B0032aData[1] , B0032aData[3] + 17, B0032aData[4] - 20, B0032aData[2], B0032aData[6], 14 , 4);
			
			/////////////////
			// ROOM B0032 //
			/////////////////	
			
			var B0032Data = new Array(
			/*R[0]:*/ "B0032",/*Name[1]:*/"Nitten",/*Nb of Bl[2]:*/ 8,/* X[3]:*/ 360 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 55);
				
					createBlind ( 'blind55', '55' , B0032Data[3] , B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind56', '56' , B0032Data[3] + B0032Data[5] , B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind57', '57' , B0032Data[3] + B0032Data[5]*2, B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind58', '58' , B0032Data[3] + B0032Data[5]*3, B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind59', '59' , B0032Data[3] + B0032Data[5]*4, B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind60', '60' , B0032Data[3] + B0032Data[5]*5, B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind61', '61' , B0032Data[3] + B0032Data[5]*6, B0032Data[4] , B0032Data[0]);
					createBlind ( 'blind62', '62' , B0032Data[3] + B0032Data[5]*7, B0032Data[4] , B0032Data[0]);//Width. Height//
					createLabel ( B0032Data[1] , B0032Data[3] + 30, B0032Data[4] - 40, B0032Data[2], B0032Data[6], 20 , 4);
			
			
			
			
			
			////Add layers on map===================/////
			map.addLayers([Sal0, vectorLayer, textLabels]);
			
			///// Do not displaya blinds if zoom level is smaller than 2
			
			map.events.register("zoomend", map, zoomChanged);
			
			function zoomChanged()
				{
				  zoom = map.getZoom();
				  if (zoom > 1)
				  {
					vectorLayer.setVisibility (true);
				  }
				  else
				  {
					vectorLayer.setVisibility (false);
				  }
				}
			
			/// Do not dispaly blinds when layer is loaded 
			
			map.events.register("addlayer", map, blindDisplayChanged);
			
			function blindDisplayChanged()
				{
					vectorLayer.setVisibility (false);
				 }
			
			
			////Select feature on vector layers============/////
			var selectStuff = new OpenLayers.Control.SelectFeature([vectorLayer , textLabels], {
			  multiple: true,
			  clickout: false,
			  toggle: true,
			  onSelect : recordToDiv,
			  onUnselect : eraseFromDiv
			});
			
			
			
			
			map.addControl(selectStuff);  
			selectStuff.activate(); 
			
			////==========================/////
			
			////==========================///// 
			
			
			
			
			//map.addControl(new OpenLayers.Control.LayerSwitcher());
			//map.zoomToMaxExtent();	
			map.zoomTo("2");

			
}
            