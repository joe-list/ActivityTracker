function LocationService() 
{
    
}

LocationService.prototype = 
{
    _watchID:null,
    _currentEverlivePostion:null,
    _currentJSPosition:null,
    
    getCurrentPostion:function()
    {
        this.refreshLocation();
    },
    
    startWatch:function()
    {
       var options = 
        {
            enableHighAccuracy: true,
            timeout:1200000,
            maximumAge: 0,
            desiredAccuracy: 0, 
            frequency: 1
        },
    
        that = this;

        // Update every 1 ms seconds

        watchID = navigator.geolocation.watchPosition(function() {that.onSuccess.apply(that, arguments);}, function() {that.onError.apply(that, arguments);}, options);

    },
    
    stopWatch:function()
    {
        if (this.watchID != null) {
            this.navigator.geolocation.clearWatch(watchID);
            this.watchID = null;
        }
    },
    
    refreshLocation:function()
    {
        var options = 
        {
            enableHighAccuracy: true
        },
        that = this;
        
		navigator.geolocation.getCurrentPosition(function() {that._onSuccess.apply(that, arguments);}, function() {that._onError.apply(that, arguments);}, options);
	},
        
    _onSuccess:function(position) 
    {

        this._currentPostion = new Everlive.GeoPoint(position.coords.longitude, position.coords.latitude);
        this._currentJSPosition = position;
	},
    
	_onError:function(error) 
    {
		alert(error);
	}
};