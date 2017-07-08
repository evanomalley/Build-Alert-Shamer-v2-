import React from 'react';
import style from '../components/buildAlert.scss';
import localDrink from 'material-ui/svg-icons/maps/map';

class Map extends React.Component {
//43.092058, -77.656996
	componentDidMount() {
		var barList = [
		{name: 'Scholars', des: 'Good place to play billards', pos: {lat: 42.357681, lng: -71.059070}}, 
		{name: 'Meadhall', des: 'Lots of rotating taps!', pos: {lat: 42.363726, lng: -71.087300}}, 
		{name: 'Warren Tavern', des: 'Trivia every monday, all hail barnecle dicks!', pos: {lat: 42.374174, lng: -71.063141}},
		{name: 'Salsaritas', des: 'Really good margaritas', pos: {lat: 43.083124, lng: -77.680632}},
		{name: 'Lovin\' Cup', des: 'Pint night Tuesdays, free cup!', pos: {lat: 43.092058, lng: -77.656996}},
		{name: 'The Matador', des: 'Very good tequila bar', pos: {lat: 47.673219, lng: -122.123125}},
		{name: 'Rhein Haus', des: 'Friendly staff, helped to ignore drama', pos: {lat: 47.610863, lng: -122.316606}}
		];
		var markers = [];

		var boston = {lat: 42.352469, lng: -71.075784};
		var myStyles =[
		    {
		        featureType: "poi",
		        elementType: "labels",
		        stylers: [
		              { visibility: "off" }
		        ]
		    }
		];
        var map = new google.maps.Map(document.getElementById('map-cont'), {
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          center: boston,
          styles: myStyles,
          minZoom: 3
        });

        for(var i = 0; i < barList.length; i++){

         	var contentString = 'I like to drink here';

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			 });

	        var marker = new google.maps.Marker({
	          position: barList[i].pos,
	          label: {
	          	text: barList[i].name,
	          },
	          icon: {
	          	url: "/img/beer.png",
	          	labelOrigin: new google.maps.Point(15,35),
			    scaledSize: new google.maps.Size(30, 30), // scaled size
			    origin: new google.maps.Point(0,0), // origin
			    anchor: new google.maps.Point(15,15) // anchor
	          },
	          des: barList[i].des
	        });
	        marker.addListener('click', function() {
	        	infowindow.setContent(this.des);
			    infowindow.open(map, this);
			});
			markers.push(marker);
	    }
	    var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	    var pathCoords = [
		{lat: 42.357681, lng: -71.059070}, 
		{lat: 42.363726, lng: -71.087300}, 
		{lat: 42.374174, lng: -71.063141},
		{lat: 42.357681, lng: -71.059070} 
	    ];

	    var path = new google.maps.Polyline({
	    	path: pathCoords,
	    	geodesic: true,
	    	strokeColor: '#FF0000',
	    	strokeOpacity: 1.0,
	    	strokeWidth: 2
	    });

	    path.setMap(map);

	}

	render(){
		return(
			<div className='map-cont' id='map-cont'></div>
		)
	}
}

export default Map;