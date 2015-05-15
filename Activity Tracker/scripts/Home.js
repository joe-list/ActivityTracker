(function () 
 {
     
     
	    window.Home = 
        {
            models: 
            {
                Home: 
                {
                  title: 'Home'
                },
                
                AddActivity:
                {
                    title:"",
                    description:"",
                    start:"",
                    end:"",
                    location:""
                },
                
                AddLocation:
                {
                    title:"",
                    location:""
                }
               
            },
            show: function() 
            {

            },
            
            ShowAddActivity: function()
            {
              $("#AddActivityView").data("kendoMobileModalView").open();
            },
            
            
            HideAddActivity: function()
            {
              $("#AddActivityView").data("kendoMobileModalView").close();
            },
            
            DataAddActivity: function()
            {
              //alert(AddActivity.Title);
                var LocationSvc = new LocationService();
                
                LocationSvc.getCurrentPostion();

                alert(LocationSvc._currentJSPosition.coords.longitude);
            },
            
            ShowSaveLocation: function()
            {
              $("#SaveLocationView").data("kendoMobileModalView").open();
            },
            
            HideSaveLocation: function()
            {
              $("#SaveLocationView").data("kendoMobileModalView").close();
            },
            
            hide: function() 
            {

            }
        };
    
    function AddActivity()
    {
        alert("Save Activity");
    }
}());