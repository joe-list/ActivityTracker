(function () 
 {
    //var ActivityDataSource;
        
	    window.Activity = 
        {
            models: 
            {
                Location: 
                {
                  Address: '',
                  Location: '',
                  Title: '',
                  CreatedAt :'',
                  EndTime :''
                }
            },
             filterByDate: function(){
                var day = new Date($("#ActivityDatePicker").val());
                var year = 2015;
                var month = day.getMonth();
                var day = day.getDate();
                var previousDay = new Date(year, month, day);
                var nextDay = new Date(year, month, day+1);
                window.LocationDataSource.filter({logic:"and",filters:[{ field: "CreatedAt", operator: "gt", value: previousDay },{ field: "CreatedAt", operator: "lt", value: nextDay }]});
            },
            show:function() 
            {
                $("#listView").kendoListView({
                    template: kendo.template($("#template").html()),
                    editTemplate: kendo.template($("#editTemplate").html()),
                    dataSource: window.LocationDataSource
                 });
                
                $("#ActivityDatePicker").kendoDatePicker({
                    value:window.selectedDate
                });
                
                 window.Activity.filterByDate();
                $("#ActivityDatePicker").on('change', function(){
                    window.selectedDate = new Date($("#ActivityDatePicker").val());
                	console.log(window.selectedDate);
                    $("#ActivityReportDatePicker").val($("#ActivityDatePicker").val());
                   window.Activity.filterByDate();
                });
            },

            hide:function() 
            {

            },
            
            list:function()
            {
                
            },

            addEvent:function()
            {
                
            }
	    };
}());