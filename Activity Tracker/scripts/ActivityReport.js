(function () {
    
function BuildMap(){
    var data = window.LocationDataSource.view();
        var points = [],center = [],first = [],linePoints = [],firstb = true;
        for (var i=0; i<data.length; i++){
            center = [data[i].Location.latitude,data[i].Location.longitude];
            if (firstb){firstb = false;first = center;}
            linePoints.push([data[i].Location.longitude,data[i].Location.latitude]);
            points.push({latlng:center})        
        }
        var map = $('#ActivityMap').kendoMap({
        center: first,
        zoom:10,
        layerDefaults: {bing: {opacity: 0.8}},
        layers: [
        {
            type: 'tile',urlTemplate: 'http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png'
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
                    opacity: 0.5
            	}
            },
            dataSource: {
              type: 'geojson',
              data: [{
                'type': 'Feature',
                'id': 'USA-ND',
                'properties': {
                  'name': 'North Dakota',
                  'abbrev': 'ND'
                },
                'geometry': {
                  'type': 'LineString',
                  'coordinates': linePoints
                }
              }]
            }
          }],shapeCreated: function (e) {}
    });
}
    
	window.ActivityReport = 
    {
         filterByDate: function(){
            var day = new Date($('#ActivityReportDatePicker').val());
            var year = 2015;
            var month = day.getMonth();
            var day = day.getDate();
            var previousDay = new Date(year, month, day);
            var nextDay = new Date(year, month, day+1);
            window.LocationDataSource.filter({logic:'and',filters:[{ field: 'CreatedAt', operator: 'gt', value: previousDay },{ field: 'CreatedAt', operator: 'lt', value: nextDay }]});
            BuildMap();
    	},
        alertMe:function(ID){
          alert('whatoh');  
        },
        submit: function(){
            
            var data = window.LocationDataSource.view();
            var html = "";
            for (var i=0;i<data.length;i++){
                 html += "<li>";
                html += data[i].Address + ": [<i>";
                html += data[i].CreatedAt + "-";
                html += data[i].EndTime + "</i>]";
                html += "</li>";
            } html += "</ul>";
			var attributes = {
                'Recipients': [
                    'inmodify@gmail.com'
                ],
                'Context': {
                    'CustomSubject': 'Timecard Submit',
                    'ActualTracking': html
                }
                
            };
  			$.ajax({
                type: 'POST',
                url: 'http://api.everlive.com/v1/Metadata/Applications/8clvJAPz7Og7DgU5/EmailTemplates/TimeTracker/send',
                contentType: 'application/json',
                headers: {
                    'Authorization': 'masterkey XswvQu5FOhOwYSmWsUw5mLjkGUTvpxj1'
                },
                data: JSON.stringify(attributes),
                success: function(data) {
                    alert('Activity Report Submitted.');
                },
                error: function(error) {
                    alert(JSON.stringify(error));
                }
            });  
        },
        show: function() {
              $('#ActivityReportDatePicker').kendoDatePicker({value:window.selectedDate});
            
            $('#ActivityReportDatePicker').on('change', function(){
                window.selectedDate = new Date($('#ActivityReportDatePicker').val());
                console.log(window.selectedDate);
                $('#ActivityDatePicker').val($('#ActivityReportDatePicker').val());
               	window.ActivityReport.filterByDate();
            });
            
             $('#listViewAR').kendoListView({
                template: kendo.template($('#listViewTemplateAR').html()),
                dataSource: window.LocationDataSource,
                endlessScroll: true
            });
            
            window.ActivityReport.filterByDate();
		}
	};
}());