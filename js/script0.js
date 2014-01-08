function init() {
			 
			 map = new OpenLayers.Map('map' , {
				 controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.ArgParser(),
            new OpenLayers.Control.Attribution()]
			 //, options
			 // ACTIVATE IF IMAGE NOT RESOLUTION SIZE			 
			});
			 
			/*var options = {
				maxExtent: new OpenLayers.Bounds(0,0,4096,4096),
				maxResolution: 4096 / 256,
				numZoomLevels: 6
			};*/
			
			/*var options = {numZoomLevels: 7,
							isBaseLayer: true,
							};*/
							
			
			/* layer = new OpenLayers.Layer.Vector(
                "Marker Drop Shadows",
                {
                    styleMap: new OpenLayers.StyleMap({
                        // Set the external graphic and background graphic images.
                        externalGraphic: "img/BlindSelected.png",
                        backgroundGraphic: "img/Blind.png",
                        
                        // Makes sure the background graphic is placed correctly relative
                        // to the external graphic.
                        backgroundXOffset: 0,
                        backgroundYOffset: -7,
                        
                        // Set the z-indexes of both graphics to make sure the background
                        // graphics stay in the background (shadows on top of markers looks
                        // odd; let's not do that).
                        graphicZIndex: MARKER_Z_INDEX,
                        backgroundGraphicZIndex: SHADOW_Z_INDEX,
                        
                        pointRadius: 10
                    }),
                    isBaseLayer: true,
                    rendererOptions: {yOrdering: true},
                    renderers: renderer
                }
            );   */
			
							
										
			var Sal0 = new OpenLayers.Layer.Image(
				'Sal 0',
				'img/GroundFloorPlan.jpg',
				new OpenLayers.Bounds(-340, -240, 340, 240),
				new OpenLayers.Size(680, 480),
				{numZoomLevels: 7}
				); 
				
				
            
			/* var Sal0 = new OpenLayers.Layer.TMS('Sal 0','',
			
				{url: '', serviceVersion: '.', layername: '.', alpha: true,
     			type: 'jpg', getURL: getTileURL},
				new OpenLayers.Bounds(-512, -384, 512, 384),
				new OpenLayers.Size(1024, 768),
				{numZoomLevels: 7});	
			
			function getTileURL(bounds) 
			{
				var res = this.map.getResolution();
				var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
				var y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h));
				var z = this.map.getZoom();
			
				var path = "img/tiles/" + z + "/" + x + "/" + y + "." + this.type;
				var url = this.url;
				if (url instanceof Array) 
				{
					url = this.selectUrl(path, url);
				}
				return url + path;
			} */

				
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
					})
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
			 
				
			//polygonLayer.styleMap.styles.default.defaultStyle.label = "new label";
			//polygonLayer.redraw();
			/*	
			vectorLayer.events.on({
				featureselected: function(event) {
					var feature = event.feature;
					var id = feature.attributes.key;
					var output = "Blind: " + id;
					document.getElementById("output-id").innerHTML = output;
				}
			});
			
			*/
				
			// ADD TO SELECTED BLINDS [[[[
			//////////////////////////////
			
			function recordToDiv(feature) {
				
				
				var id = feature.attributes.key;
				if (!isNaN(id)){
				//var output = "Blind: " + id;
				//document.getElementById("output-id").innerHTML = output;
				$("#output-id ul").append('<li id="blind' + id + '"><p>Blind ' + id + '</p></li>');
				}
				
				else {
					
					$('#output-id #blindSelectedList li').remove();
					
					for(var f=0;f<vectorLayer.features.length;f++)
							
							{
									
								var feature = vectorLayer.features[f];
								var id = feature.attributes.key;						
						
								
									if(id>97&&id<102)
										{
											selectStuff.select(feature);
										}
							}
						
				}
			}
			
			function eraseFromDiv(feature) {
				var id = feature.attributes.key;
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
					
							
								if(id>97&&id<102)
									{
										$( '#blind' + id).remove();
										selectStuff.unselect(feature);
									}
						}
				}
						
			}
			
			
			// Deselect All // 
			
			$('#deselectBlinds').click(function(){				
				
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
						
						if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1 ){
							//alert( "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/up/1/B1006/"+id );
					$.ajax({
						  type: "GET",
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/up/1/B1006/"+id
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
						
						if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1 ){
							//alert( "Blind " + id +  " STOP" );
							$.ajax({
						  type: "GET",
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/stop/1/B1006/"+id
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
						
						if(vectorLayer.selectedFeatures.indexOf(vectorLayer.features[f])> -1 ){
							//alert( "Blind " + id +  " going DOWN" );
							$.ajax({
						  type: "GET",
						  url: "http://" + serverIp + ":" + serverPort + "/ServerJAXRS/cmd/down/1/B1006/"+id
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
			
			//var toggleRoomSelection = 1;
			
			

/*
			textLabels.events.on({
				
				featureselected: function(){
					
					toggleRoomSelection = 1 - toggleRoomSelection;	
					
					if (toggleRoomSelection == 1 ){
					
						for(var f=0;f<vectorLayer.features.length;f++)
						
						{
								
							var feature = vectorLayer.features[f];
							var id = feature.attributes.key;						
					
							
								if(id>0&&id<5)
									{
										selectStuff.select(feature);
									}
						}
					}
					
					if (toggleRoomSelection == 0 ){
					
						for(var f=0;f<vectorLayer.features.length;f++)
						
						{
								
							var feature = vectorLayer.features[f];
							var id = feature.attributes.key;						
					
							
								if(id>0&&id<5)
									{
										selectStuff.unselect(feature);
									}
						}
					}
					
				} });
				
				*/
			
				
			/*vectorLayer.events.on({				
				
				featureselected: function(event) {
					
						var feature = vectorLayer.features[0];
											
						for(var f=0;f<vectorLayer.features.length;f++) {				
							this.toggleSelect(feature[f]);							
							break;
						}
					}				
				
				
			});	
			
			*/	
			
			/*
			
			map.events.register("click", map, function(e) {
			  var position = map.getLonLatFromPixel(e.xy);
			
			  OpenLayers.Util.getElement("mydiv").innerHTML = 
					position.lon.toFixed(3) + ', ' + position.lat.toFixed(3);
			
			});
			
			*/
			
			/////////////////
			// ROOM B1006 //
			/////////////////	
			
			// Blinds
			var blind1X = -99;
			var blind1Y = 145;
			var blind1 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind1X, blind1Y),
				5,
				4
			));			
			blind1.attributes = {
			  key: "98"
			};	
			
			var blind2X = -90;
			var blind2Y = 145;
			var blind2 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind2X, blind2Y),
				5,
				4
			));
			blind2.attributes = {
			  key: "99"
			};			
			
			var blind3X = -81;
			var blind3Y = 145;
			var blind3 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind3X, blind3Y),
				5,
				4
			));	
			blind3.attributes = {
			  key: "100"
			};			
			
			var blind4X = -73;
			var blind4Y = 145;
			var blind4 = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon.createRegularPolygon(
				new OpenLayers.Geometry.Point(blind4X, blind4Y),
				5,
				4
			));
			blind4.attributes = {
			  key: "101"
			};
			
			////==========================/////
			//// Room Label
			////==========================/////
			
			//Rectangle	
			
			var roomB1006LabelX = -85;
			var roomB1006LabelY = 130;
			var p1 = new OpenLayers.Geometry.Point(roomB1006LabelX+15, roomB1006LabelY-4);
			var p2 = new OpenLayers.Geometry.Point(roomB1006LabelX+15, roomB1006LabelY+4);
			var p3 = new OpenLayers.Geometry.Point(roomB1006LabelX-15, roomB1006LabelY+4);
			var p4 = new OpenLayers.Geometry.Point(roomB1006LabelX-15, roomB1006LabelY-4);			
			var pnt= [];
			pnt.push(p1,p2,p3,p4);			
			var ln = new OpenLayers.Geometry.LinearRing(pnt);
			//Final Text			
			var roomB1006Label = new OpenLayers.Feature.Vector(ln, {key: "Femten", fontSize: map.getZoom()},  null);
			
			////==========================/////
			////==========================/////
			

			
			////Adding Elements on layers===============/////
			vectorLayer.addFeatures([blind1 , blind2 , blind3, blind4 ]); 
			textLabels.addFeatures([roomB1006Label]);
			////==========================/////
			
			
			////Add layers on map===================/////
			//map.addLayers([Sal0, vectorLayer, textLabels]);
			map.addLayers([Sal0]);
			
			
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
            