function init() {
			 
			 map = new OpenLayers.Map('map' , {
				 controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ArgParser(),
            new OpenLayers.Control.Attribution()]		 
			});
										
			var Sal1 = new OpenLayers.Layer.Image(
				'Sal 1',
				'../img/1FloorPlan.jpg',
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
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/up/1/" + roomId + "/"+id
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
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/stop/1/" + roomId + "/"+id 
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
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/down/1/" + roomId + "/"+id 
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
				
				function createBlindA (blindName , number, x, y, roomNumber, angle) {
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
					var origin = new OpenLayers.Geometry.Point(x, y); 
					blindName.geometry.rotate(15, origin);
					blindName.layer.drawFeature(blindName);
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
			// ROOM A1001 //
			/////////////////	
			
			var A1001Data = new Array(
			/*R Nb[0]:*/ "A1001",/*Name[1]:*/"Et",/*Nb of Bl[2]:*/ 8,/* X[3]:*/ -493 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 11 ,/*1st Bl[6]*/ 63);
				
					createBlind ( 'blind63', '63' , A1001Data[3] , A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind64', '64' , A1001Data[3] + A1001Data[5], A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind65', '65' , A1001Data[3] + A1001Data[5]*2 , A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind66', '66' , A1001Data[3] + A1001Data[5]*3, A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind67', '67' , A1001Data[3] + A1001Data[5]*4, A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind68', '68' , A1001Data[3] + A1001Data[5]*5, A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind69', '69' , A1001Data[3] + A1001Data[5]*6, A1001Data[4] , A1001Data[0]);
					createBlind ( 'blind70', '70' , A1001Data[3] + A1001Data[5]*7, A1001Data[4] , A1001Data[0]); //Width. Height//
					createLabel ( A1001Data[1] , A1001Data[3] + 40, A1001Data[4] - 20, A1001Data[2], A1001Data[6], 30 , 4);
					
			
			
			/////////////////
			// ROOM A1008 //
			/////////////////	
			
			var A1008Data = new Array(
			/*R Nb[0]:*/ "A1001b",/*Name[1]:*/"Tre",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ -399 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 71);
				
					createBlind ( 'blind71', '71' , A1008Data[3] , A1008Data[4] , A1008Data[0]);
					createBlind ( 'blind72', '72' , A1008Data[3] + A1008Data[5] , A1008Data[4] , A1008Data[0]);
					createBlind ( 'blind73', '73' , A1008Data[3] + A1008Data[5]*2, A1008Data[4] , A1008Data[0]);
					createBlind ( 'blind74', '74' , A1008Data[3] + A1008Data[5]*3, A1008Data[4] , A1008Data[0]); //Width. Height//
					createLabel ( A1008Data[1] , A1008Data[3] + 13, A1008Data[4] - 40, A1008Data[2], A1008Data[6], 14 , 4);
					
			
			
			/////////////////
			// ROOM A1601 //
			/////////////////	
			
			var A1601Data = new Array(
			/*R Nb[0]:*/ "A1601",/*Name[1]:*/"Depot",/*Nb of Bl[2]:*/ 2,/* X[3]:*/ -357 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 75);
				
					createBlind ( 'blind75', '75' , A1601Data[3] , A1601Data[4] , A1601Data[0]);
					createBlind ( 'blind76', '76' , A1601Data[3] + A1601Data[5] , A1601Data[4] , A1601Data[0]); //Width. Height//
					createLabel ( A1601Data[1] , A1601Data[3] + 4, A1601Data[4] - 10, A1601Data[2], A1601Data[6], 8 , 4);
					
			
			/////////////////
			// ROOM A1340 //
			/////////////////	
			
			var A1340Data = new Array(
			/*R Nb[0]:*/ "A1340",/*Name[1]:*/"Kopi",/*Nb of Bl[2]:*/ 2,/* X[3]:*/ -331 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 77);
				
					createBlind ( 'blind77', '77' , A1340Data[3] , A1340Data[4] , A1340Data[0]);
					createBlind ( 'blind78', '78' , A1340Data[3] + A1340Data[5] , A1340Data[4] , A1340Data[0]); //Width. Height//
					createLabel ( A1340Data[1] , A1340Data[3] + 4, A1340Data[4] - 25, A1340Data[2], A1340Data[6], 8 , 4);
					
			/////////////////
			// ROOM A1017 //
			/////////////////	
			
			var A1017Data = new Array("A1017","Fem", 4, -233 , 230 , 9 , 79);
			//Room Number [0]// Room Name[1]// Number of Blinds[2]// X Coord[3]// Y Coord[4]// Blind Drift[5]// First Blind[6]
				
					createBlind ( 'blind79', '79' , A1017Data[3] , A1017Data[4] , A1017Data[0]);
					createBlind ( 'blind80', '80' , A1017Data[3] + A1017Data[5] , A1017Data[4] , A1017Data[0]);
					createBlind ( 'blind81', '81' , A1017Data[3] + A1017Data[5]*2, A1017Data[4] , A1017Data[0]);
					createBlind ( 'blind82', '82' , A1017Data[3] + A1017Data[5]*3, A1017Data[4] , A1017Data[0]); //Width. Height//
					createLabel ( A1017Data[1] , A1017Data[3] + 13, A1017Data[4] - 40, A1017Data[2], A1017Data[6], 12 , 4);
					
			/////////////////
			// ROOM B1001 //
			/////////////////	
			
			var B1001Data = new Array("B1001","Syv", 3, -192.5 , 230 , 9 , 83);
			//Room Number [0]// Room Name[1]// Number of Blinds[2]// X Coord[3]// Y Coord[4]// Blind Drift[5]// First Blind[6]
				
					createBlind ( 'blind83', '83' , B1001Data[3] , B1001Data[4] , B1001Data[0]);
					createBlind ( 'blind84', '84' , B1001Data[3] + B1001Data[5] , B1001Data[4] , B1001Data[0]);
					createBlind ( 'blind85', '85' , B1001Data[3] + B1001Data[5]*2, B1001Data[4] , B1001Data[0]); //Width. Height//
					createLabel ( B1001Data[1] , B1001Data[3] + 7, B1001Data[4] - 20, B1001Data[2], B1001Data[6], 8 , 4);
					
			/////////////////
			// ROOM B1004 //
			/////////////////	
			
			var B1004Data = new Array("B1004","Ni", 3, -162 , 230 , 9 , 86);
			//Room Number [0]// Room Name[1]// Number of Blinds[2]// X Coord[3]// Y Coord[4]// Blind Drift[5]// First Blind[6]
				
					createBlind ( 'blind86', '86' , B1004Data[3] , B1004Data[4] , B1004Data[0]);
					createBlind ( 'blind87', '87' , B1004Data[3] + B1004Data[5] , B1004Data[4] , B1004Data[0]);
					createBlind ( 'blind88', '88' , B1004Data[3] + B1004Data[5]*2, B1004Data[4] , B1004Data[0]); //Width. Height//
					createLabel ( B1004Data[1] , B1004Data[3] + 7, B1004Data[4] - 40, B1004Data[2], B1004Data[6], 8 , 4);
					
			/////////////////
			// ROOM B1006 //
			/////////////////	
			
			var B1006Data = new Array(
			/*R Nb[0]:*/ "B1006",/*Name[1]:*/"Elleve",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ -125 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 89);
				
					createBlind ( 'blind89', '89' , B1006Data[3] , B1006Data[4] , B1006Data[0]);
					createBlind ( 'blind90', '90' , B1006Data[3] + B1006Data[5] , B1006Data[4] , B1006Data[0]);
					createBlind ( 'blind91', '91' , B1006Data[3] + B1006Data[5]*2, B1006Data[4] , B1006Data[0]);
					createBlind ( 'blind92', '92' , B1006Data[3] + B1006Data[5]*3, B1006Data[4] , B1006Data[0]); //Width. Height//
					createLabel ( B1006Data[1] , B1006Data[3] + 12, B1006Data[4] - 20, B1006Data[2], B1006Data[6], 15 , 4);
					
			/////////////////
			// ROOM B1010 //
			/////////////////	
			
			var B1010Data = new Array(
			/*R Nb[0]:*/ "B1010",/*Name[1]:*/"Tretten",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ -75 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 93);
				
					createBlind ( 'blind93', '93' , B1010Data[3] , B1010Data[4] , B1010Data[0]);
					createBlind ( 'blind94', '94' , B1010Data[3] + B1010Data[5] , B1010Data[4] , B1010Data[0]);
					createBlind ( 'blind95', '95' , B1010Data[3] + B1010Data[5]*2, B1010Data[4] , B1010Data[0]);
					createBlind ( 'blind96', '96' , B1010Data[3] + B1010Data[5]*3, B1010Data[4] , B1010Data[0]);
					createBlind ( 'blind97', '97' , B1010Data[3] + B1010Data[5]*4, B1010Data[4] , B1010Data[0]); //Width. Height//
					createLabel ( B1010Data[1] , B1010Data[3] + 17, B1010Data[4] - 40, B1010Data[2], B1010Data[6], 15 , 4);
					
			/////////////////
			// ROOM B1016 //
			/////////////////	
			
			var B1016Data = new Array(
			/*R Nb[0]:*/ "B1016",/*Name[1]:*/"Femten",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ -14 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 98);
				
					createBlind ( 'blind98', '98' , B1016Data[3] , B1016Data[4] , B1016Data[0]);
					createBlind ( 'blind99', '99' , B1016Data[3] + B1016Data[5] , B1016Data[4] , B1016Data[0]);
					createBlind ( 'blind100', '100' , B1016Data[3] + B1016Data[5]*2, B1016Data[4] , B1016Data[0]);
					createBlind ( 'blind101', '101' , B1016Data[3] + B1016Data[5]*3, B1016Data[4] , B1016Data[0]); //Width. Height//
					createLabel ( B1016Data[1] , B1016Data[3] + 14, B1016Data[4] - 20, B1016Data[2], B1016Data[6], 15 , 4);
					
					
			/////////////////
			// ROOM B1019 //
			/////////////////
			
			var B1019AllData = new Array(
			/*R*/"B1019All",/*Name[1]:*/"KONTOR B1019",/*Nb of Bl[2]:*/ 13,/* X[3]:*/ 154 ,/*Y[4]:*/ 230 ,/*Dr[5]:*/ 9 ,/*1st Bl[6]*/ 102);
				
			//Width. Height//
					createLabel ( B1019AllData[1] , B1019AllData[3] + 14, B1019AllData[4] - 60, B1019AllData[2], B1019AllData[6], 30 , 4);
					
			// ROOM B1019a //
			/////////////////	
			
			var B1019aData = new Array(
			/*R Nb[0]:*/"B1019",/*Name[1]:*/"B1019 A",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 104 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 102);
				
					createBlind ( 'blind102', '102' , B1019aData[3] , B1019aData[4] , B1019aData[0]);
					createBlind ( 'blind103', '103' , B1019aData[3] + B1019aData[5] , B1019aData[4] , B1019aData[0]);
					createBlind ( 'blind104', '104' , B1019aData[3] + B1019aData[5]*2, B1019aData[4] , B1019aData[0]);
					createBlind ( 'blind105', '105' , B1019aData[3] + B1019aData[5]*3, B1019aData[4] , B1019aData[0]); //Width. Height//
					createLabel ( B1019aData[1] , B1019aData[3] + 14, B1019aData[4] - 20, B1019aData[2], B1019aData[6], 15 , 4);
					
			// ROOM B1019b //
			/////////////////	
			
			var B1019bData = new Array(
			/*R Nb[0]:*/"B1019b",/*Name[1]:*/"B1019 B",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ 150 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 106);
				
					createBlind ( 'blind106', '106' , B1019bData[3] , B1019bData[4] , B1019bData[0]);
					createBlind ( 'blind107', '107' , B1019bData[3] + B1019bData[5] , B1019bData[4] , B1019bData[0]);
					createBlind ( 'blind108', '108' , B1019bData[3] + B1019bData[5]*2, B1019bData[4] , B1019bData[0]);
					createBlind ( 'blind109', '109' , B1019bData[3] + B1019bData[5]*3, B1019bData[4] , B1019bData[0]);
					createBlind ( 'blind110', '110' , B1019bData[3] + B1019bData[5]*4, B1019bData[4] , B1019bData[0]);  //Width. Height//
					createLabel ( B1019bData[1] , B1019bData[3] + 18, B1019bData[4] - 30, B1019bData[2], B1019bData[6], 15 , 4);
					
			// ROOM B1019c //
			/////////////////	
			
			var B1019cData = new Array(
			/*R Nb[0]:*/"B1019c",/*Name[1]:*/"B1019 C",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 204 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 111);
				
					createBlind ( 'blind111', '111' , B1019cData[3] , B1019cData[4] , B1019cData[0]);
					createBlind ( 'blind112', '112' , B1019cData[3] + B1019cData[5] , B1019cData[4] , B1019cData[0]);
					createBlind ( 'blind113', '113' , B1019cData[3] + B1019cData[5]*2, B1019cData[4] , B1019cData[0]);
					createBlind ( 'blind114', '114' , B1019cData[3] + B1019cData[5]*3, B1019cData[4] , B1019cData[0]); //Width. Height//
					createLabel ( B1019cData[1] , B1019cData[3] + 14, B1019cData[4] - 20, B1019cData[2], B1019cData[6], 15 , 4);
					
			/////////////////
			// ROOM B1032 //
			/////////////////
			
			var B1032AllData = new Array(
			/*R*/"B1032All",/*Name[1]:*/"KONTOR B1032",/*Nb of Bl[2]:*/ 18,/* X[3]:*/ 334 ,/*Y[4]:*/ 230 ,/*Dr[5]:*/ 9 ,/*1st Bl[6]*/ 115);
				
			//Width. Height//
					createLabel ( B1032AllData[1] , B1032AllData[3] + 14, B1032AllData[4] - 60, B1032AllData[2], B1032AllData[6], 30 , 4);
					
			// ROOM B1032a //
			/////////////////	
			
			var B1032aData = new Array(
			/*R Nb[0]:*/"B1032",/*Name[1]:*/"B1032 A",/*Nb of Bl[2]:*/ 5,/* X[3]:*/ 264 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 115);
				
					createBlind ( 'blind115', '115' ,B1032aData[3] ,B1032aData[4] ,B1032aData[0]);
					createBlind ( 'blind116', '116' ,B1032aData[3] +B1032aData[5] ,B1032aData[4] ,B1032aData[0]);
					createBlind ( 'blind117', '117' ,B1032aData[3] +B1032aData[5]*2,B1032aData[4] ,B1032aData[0]);
					createBlind ( 'blind118', '118' ,B1032aData[3] +B1032aData[5]*3,B1032aData[4] ,B1032aData[0]);
					createBlind ( 'blind119', '119' ,B1032aData[3] +B1032aData[5]*4,B1032aData[4] ,B1032aData[0]);  //Width. Height//
					createLabel (B1032aData[1] ,B1032aData[3] + 18,B1032aData[4] - 20,B1032aData[2],B1032aData[6], 15 , 4);
					
			// ROOM B1032b //
			/////////////////	
			
			var B1032bData = new Array(
			/*R Nb[0]:*/"B1032b",/*Name[1]:*/"B1032 B",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 330 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 120);
				
					createBlind ( 'blind120', '120' , B1032bData[3] , B1032bData[4] , B1032bData[0]);
					createBlind ( 'blind121', '121' , B1032bData[3] + B1032bData[5] , B1032bData[4] , B1032bData[0]);
					createBlind ( 'blind122', '122' , B1032bData[3] + B1032bData[5]*2, B1032bData[4] , B1032bData[0]);
					createBlind ( 'blind123', '123' , B1032bData[3] + B1032bData[5]*3, B1032bData[4] , B1032bData[0]);  //Width. Height//
					createLabel ( B1032bData[1] , B1032bData[3] + 12, B1032bData[4] - 30, B1032bData[2], B1032bData[6], 15 , 4);
					
			// ROOM B1032c //
			/////////////////	
			
			var B1032cData = new Array(
			/*R Nb[0]:*/"B1032c",/*Name[1]:*/"B1032 C",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 384 ,/*Y[4]:*/ 230 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 124);
				
					createBlind ( 'blind124', '124' , B1032cData[3] , B1032cData[4] , B1032cData[0]);
					createBlind ( 'blind125', '125' , B1032cData[3] + B1032cData[5] , B1032cData[4] , B1032cData[0]);
					createBlind ( 'blind126', '126' , B1032cData[3] + B1032cData[5]*2, B1032cData[4] , B1032cData[0]);
					createBlind ( 'blind127', '127' , B1032cData[3] + B1032cData[5]*3, B1032cData[4] , B1032cData[0]); //Width. Height//
					createLabel ( B1032cData[1] , B1032cData[3] + 14, B1032cData[4] - 20, B1032cData[2], B1032cData[6], 15 , 4);
			
			
			// ROOM B1032d //
			/////////////////	
			
			var B1032dData = new Array(
			/*R Nb[0]:*/"B1032d",/*Name[1]:*/"B1032 D",/*Nb of Bl[2]:*/ 4,/* X[3]:*/ 400 ,/*Y[4]:*/ 220 ,/*Bl Dr[5]:*/ 9 ,/*1st Bl[6]*/ 129);
				
					createBlindA ( 'blind129', '129' , 440 , 210 , B1032dData[0], 15);
					createBlindA ( 'blind130', '130' , 443 , 200 , B1032dData[4] , B1032dData[0], 15);
					createBlindA ( 'blind131', '131' , 446 , 190, B1032dData[4] , B1032dData[0], 15);
					createBlindA ( 'blind132', '132' , 449 , 180, B1032dData[4] , B1032dData[0], 15); //Width. Height//
					createLabel ( B1032dData[1] , B1032dData[3] + 16, B1032dData[4] - 38, B1032dData[2], B1032dData[6], 15 , 4);
			
			
			
			/*				
			
			/////////////////
			// ROOM B1015 //
			/////////////////	
		
			var B1015id = "B1015";			
			var nbBlindsB1015 = 4;
			var B1015X = -14;
			var B1015Y = 230;
			var B1015Drift = 9;
			
			
			var blind98 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(B1015X, B1015Y),
				5,
				4
			));			
			blind98.attributes = {
			  key: "98" , 
			  room: B1015id
			};	
			
			var blind99X = B1015X + B1015Drift;
			var blind99Y = B1015Y;
			var blind99 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind99X, blind99Y),
				5,
				4
			));
			blind99.attributes = {
			  key: "99", 
			  room: B1015id
			};			
			
			var blind100X = blind99X + B1015Drift;
			var blind100Y = B1015Y;
			var blind100 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind100X, blind100Y),
				5,
				4
			));	
			blind100.attributes = {
			  key: "100", 
			  room: B1015id
			};			
			
			var blind101X = blind100X + B1015Drift;
			var blind101Y = B1015Y;
			var blind101 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind101X, blind101Y),
				5,
				4
			));
			blind101.attributes = {
			  key: "101", 
			  room: B1015id
			};
			
			
			////==========================/////
			//// Room Label
			////==========================/////
			
			//Rectangle	
			
			var roomB1015LabelX = B1015X + 13;
			var roomB1015LabelY = B1015Y - 20;
			var p1 = new OpenLayers.Geometry.Point(roomB1015LabelX+15, roomB1015LabelY-4);
			var p2 = new OpenLayers.Geometry.Point(roomB1015LabelX+15, roomB1015LabelY+4);
			var p3 = new OpenLayers.Geometry.Point(roomB1015LabelX-15, roomB1015LabelY+4);
			var p4 = new OpenLayers.Geometry.Point(roomB1015LabelX-15, roomB1015LabelY-4);			
			var pnt= [];
			pnt.push(p1,p2,p3,p4);			
			var ln = new OpenLayers.Geometry.LinearRing(pnt);
			//Final Text			
			var roomB1015Label = new OpenLayers.Feature.Vector(ln, {key: "Femten", fstB:98 , nbB:nbBlindsB1015, fontSize: map.getZoom()},  null);
			
			////==========================/////
			////==========================/////  */
			
			

			
			////Adding Elements on layers===============/////
			/*vectorLayer.addFeatures([blind93, blind94 , blind95 , blind96, blind97, blind98 , blind99 , blind100, blind101]); 
			textLabels.addFeatures([roomB1015Label , roomB1010Label]);*/
			////==========================/////
			
			
			////Add layers on map===================/////
			map.addLayers([Sal1, vectorLayer, textLabels]);
			
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
			map.zoomToMaxExtent();	
			//map.zoomTo("1");

			
}
            