(function () {
    
 function BuildMap()
 {
    var data = window.LocationDataSource.view();
    var points = [],center = [],first = [],linePoints = [],firstb = true;
    for (var i=0; i<data.length; i++){
        center = [data[i].Location.latitude,data[i].Location.longitude];
        if (firstb){firstb = false;first = center;}
        linePoints.push([data[i].Location.longitude,data[i].Location.latitude]);
        points.push({latlng:center})        
    }
    var nLast = linePoints.length-1;
     
    var map = $('#LocationMap').kendoMap(
    {
    center: first,
    zoom:10,
    layerDefaults: {bing: {opacity: 0.8}},
    layers: [
    {
        type: 'tile',
        urlTemplate: 'http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png'
    },
    {
        type: "shape",
        shape: "pin",
        style: {
            fill: {
                opacity: 1
            },
            stroke:{
                color: 'green',
                width: 1,
                opacity: 0.5
            }
        },
        
        dataSource: {
          type: 'geojson',
          data: [{
            'type': 'Feature',
            'geometry': 
            {
              'type': 'Point',
              'coordinates': linePoints[0],
            },
            'properties':{'tooltip': 'hello'}
          }]
        }
    },
    {
        type: "shape",
        shape: "pin",
        style: {
            fill: {
                opacity: 5
            },
            stroke:{
                color: 'green',
                width: 1,
                opacity: 0.5
            }
        },
        
        dataSource: {
          type: 'geojson',
          data: [{
            'type': 'Feature',
            'geometry': 
            {
              'type': 'Point',
              'coordinates': linePoints[linePoints.length-1],
              
            }
          }]
        }
    },
    {
        type: 'shape',
        style: {
            fill: {
                opacity: 1
            },
            stroke:{
                color: 'green',
                width: 5,
                opacity: 0.8
            }
        },
        dataSource: {
          type: 'geojson',
          data: [{
            'type': 'Feature',
            'geometry': 
            {
              'type': 'LineString',
              'coordinates': linePoints,
              
            }
          }]
        }
      }],shapeCreated: function (e) {}
    });
     
}

   
    
	window.Locations = {
        
        models: 
        {
            Locations: 
            {
              title: 'Locations'
            }
        },
        
        filterByDate: function(){
            var day = new Date($('#LocationDatePicker').val());
            var year = 2015;
            var month = day.getMonth();
            var day = day.getDate();
            var previousDay = new Date(year, month, day);
            var nextDay = new Date(year, month, day+1);
            window.LocationDataSource.filter({logic:'and',filters:[{ field: 'CreatedAt', operator: 'gt', value: previousDay },{ field: 'CreatedAt', operator: 'lt', value: nextDay }]});
            BuildMap();
    	},
            
        show: function() 
        {
			$('#LocationDatePicker').kendoDatePicker({value:window.selectedDate});
            
            window.Locations.filterByDate();

		},
        
        showmap: function()
        {

        },
        
		hide: function() 
        {
			
		}
	};
}());