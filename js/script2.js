function init() {
			 
			 map = new OpenLayers.Map('map' , {
				 controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ArgParser(),
            new OpenLayers.Control.Attribution()]		 
			});
										
			var Sal2 = new OpenLayers.Layer.Image(
				'Sal 2',
				'../img/2FloorPlan.jpg',
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
				$("#output-id ul").append('<li id="blind' + id + '"><p>P. ' + id + '</p></li>');
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
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/up/2/" + roomId + "/"+id
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
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/stop/2/" + roomId + "/"+id 
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
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/down/2/" + roomId + "/"+id 
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
										8,
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
			// ROOM B2037 //
			/////////////////	
			
			var B2037Data = new Array(
			/*R Nb[0]:*/ "B2037",/*Name[1]:*/"Kontor 2",/*Nb Bl[2]:*/ 7,/* X[3]:*/ 370 ,/*Y[4]:*/ 210 ,/*Bl Dr[5]:*/ 16 ,/*1st Bl[6]*/ 133);
				
					createBlind ( 'blind133', '133' , B2037Data[3] , B2037Data[4] , B2037Data[0]);
					createBlind ( 'blind134', '134' , B2037Data[3], B2037Data[4] - B2037Data[5] , B2037Data[0]);
					createBlind ( 'blind135', '135' , B2037Data[3], B2037Data[4] - B2037Data[5]*2  , B2037Data[0]);
					createBlind ( 'blind136', '136' , B2037Data[3], B2037Data[4] - B2037Data[5]*3 , B2037Data[0]);
					createBlind ( 'blind137', '137' , B2037Data[3], B2037Data[4] - B2037Data[5]*4, B2037Data[0]);
					createBlind ( 'blind138', '138' , B2037Data[3], B2037Data[4] - B2037Data[5]*5, B2037Data[0]);
					createBlind ( 'blind139', '139' , B2037Data[3], B2037Data[4] - B2037Data[5]*6, B2037Data[0]); //Width. Height//
					createLabel ( B2037Data[1] , B2037Data[3] - 45, B2037Data[4] - 63, B2037Data[2], B2037Data[6], 30 , 6);
					
			
			
			////Add layers on map===================/////
			map.addLayers([Sal2, vectorLayer, textLabels]);
			
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
            