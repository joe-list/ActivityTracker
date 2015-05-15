//window.onerror = function (errorMsg, url, lineNumber) {console.log('onError: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);return true;};

(function () {
    var app;

    window.APP = {
      models: {
        home: {
          title: 'Home'
        }
      }
    };
    
    window.el = new Everlive(
    {
        apiKey: '8clvJAPz7Og7DgU5',
        offlineStorage: true
    });
    
    window.previousAddress = "";
    window.previousEnd = new Date();
    window.selectedDate = new Date();
    window.LocationDataSource= new kendo.data.DataSource(
    {
        offlineStorage: "Locations-offline", 
        type: "everlive",
        transport: 
        {
            typeName: "Locations"
        }, 
        schema:
        {
            model:
            {
                id: Everlive.idField,
                fields:
                {
                    'Location':
                    {
                        defaultValue: ''
                    },
                    'Location2':
                    {
                        defaultValue: ''
                    },
                   	'Visible':
                    {
                        defaultValue: true
                    },
                    'JSLocation':
                    {
                        defaultValue: ''
                    },
                    'Address':
                    {
                        defaultValue: ''
                    },
                    'Title':
                    {
                        defaultValue: 'Auto Location'
                    },
                    'EndTime':
                    {
                        defaultValue: '',
                         type: "date"
                    },
                    'CreatedDate':
                    {
                         type: "date"
                    }
                }
            }
        },
        serverSorting: true, 
        sort: 
        { 
            field: 'CreatedAt', 
            dir: 'desc' 
        }
    });
    
    window.SettingsDataSource= new kendo.data.DataSource(
    {
        offlineStorage: "Settings-offline", 
        type: "everlive",
        transport: 
        {
            typeName: "Settings"
        }, 
        schema:
        {
            model:
            {
                id: Everlive.idField,
                fields:
                {
                    'Monday':
                    {
                        defaultValue: true
                    },
                   	'Tuesday':
                    {
                        defaultValue: true
                    },
                    'Wednesday':
                    {
                        defaultValue: true
                    },
                    'Thursday':
                    {
                        defaultValue: true
                    },
                    'Friday':
                    {
                        defaultValue: true
                    },
                    'Saturday':
                    {
                        defaultValue: false
                    },
                    'Sunday':
                    {
                        defaultValue: false
                    },
                    'Manager':
                    {
                        defaultValue: ''
                    },
                    'FromEmail':
                    {
                        defaultValue: 'ActivityTracker@gmail.com'
                    },
                    'Name':
                    {
                        defaultValue: 'Your Name goes here'
                    },
                    'Start_Time':
                    {
                        defaultValue: 7
                    },
                    'End_Time':
                    {
                        defaultValue: 6
                    },
                    'Enable_GPS':
                    {
                        defaultValue: true
                    }
                    
                }
            }
        },
        serverSorting: true, 
        sort: 
        { 
            field: 'CreatedAt', 
            dir: 'desc' 
        }
    });
    
    window.GEOLocationSVC = (function(){ 
        
        var self = {}; 
        self.minutes = 1;
        
        self.options = {frequency: 1000,enableHighAccuracy: true};

        self.run = function(){
            if (!self.previousAddress || self.previousAddress==""){
                window.LocationDataSource.fetch(function(){
                    var results = window.LocationDataSource.data();
                    
                    if (results && results[0])
                    {
                        window.previousAddress = results[0].Address;
                        window.previousEnd = results[0].EndTime;
                    }
                    self.watch();
                });
            }else{
                self.watch();                
            }
        };
        
        self.watch =function(){
            navigator.geolocation.getCurrentPosition(function() {self._onSuccess.apply(self, arguments);}, function() {self._onError.apply(self, arguments);}, self.options);
            setTimeout(self.watch, 1000*60 * self.minutes);
        };
        
        self._onSuccess=function(position)
        {
            var bingapiKey ="AsRYNFKf9cNxvyi7n6yCco2LdAuD2RU_e0KKJqfzUn93TG_BvVj38fleJtCVv58x";
            var apiKey = "8clvJAPz7Og7DgU5";
            var el = new Everlive(apiKey);
            console.log(position.coords);
            var url = "http://dev.virtualearth.net/REST/v1/Locations/" + position.coords.latitude + "," + position.coords.longitude + "?o=json&key=" + bingapiKey;
            $.getJSON(url, function(result)
            {
                var address = result.resourceSets[0].resources[0].address.formattedAddress;
                if (address && window.previousAddress != address){
                    window.previousAddress = address;
                    
                    try{
                  		window.LocationDataSource.data()[0].set("EndTime",window.previousEnd);
                        window.LocationDataSource.sync();
                    }catch(exc){console.log(exc);}
                    window.previousEnd = new Date();
                    
                    var LocationParam = new Everlive.GeoPoint(position.coords.longitude, position.coords.latitude);
                    window.LocationDataSource.add({ Location: LocationParam, Location2: [position.coords.longitude, position.coords.latitude], Address:address, CreatedAt: window.previousEnd,  EndTime: window.previousEnd  });
                    window.previousEnd = new Date();
                    window.LocationDataSource.one("sync", self.close);
                    window.LocationDataSource.sync();
                    try{
                        $("#listViewAR").data("kendoListView").dataSource.read();
                        $("#listViewAR").data("kendoListView").refresh();
                    }catch(exc){}
                }
            });
       
	};
	self._onError=function(error) {alert(error);	};
    return self;
})();
 
    document.addEventListener('deviceready', function () { 
        
        
        window.GEOLocationSVC.run();
        navigator.splashscreen.hide();
        app = new kendo.mobile.Application(document.body, {transition: 'slide',skin: 'flat',initial: 'views/Activity.html'});
    }, false);
    
     //
    //
    // after deviceready
    //
    //

   window.navigator.geolocation.getCurrentPosition(function(location) {
        console.log('Location from Phonegap');
    });

    var bgGeo = window.plugins.backgroundGeoLocation;

    /**
    * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
    */
    var yourAjaxCallback = function(response) {
        ////
        // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
        //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        //
        //
        bgGeo.finish();
    };

    /**
    * This callback will be executed every time a geolocation is recorded in the background.
    */
    var callbackFn = function(location) 
    {
        var apiKey = "8clvJAPz7Og7DgU5";
        var el = new Everlive(apiKey);
        console.log(location.coords);
        var DateEntry = new Date();

        console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
        // Do your HTTP request here to POST location to your server.
        var LocationParam = new Everlive.GeoPoint(location.longitude, location.latitude);
        window.LocationDataSource.add({ Location: LocationParam, Location2: [location.longitude, location.latitude], Address: "Background Refresh", CreatedAt: DateEntry,  EndTime: DateEntry  });
        window.LocationDataSource.one("sync", self.close);
        window.LocationDataSource.sync();
        
        //
        yourAjaxCallback.call(this);
    };

    var failureFn = function(error) {
        console.log('BackgroundGeoLocation error');
    }

    // BackgroundGeoLocation is highly configurable.
    bgGeo.configure(callbackFn, failureFn, {
        
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        activityType: 'AutomotiveNavigation',
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
    });

    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    bgGeo.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // bgGeo.stop()
    


}());