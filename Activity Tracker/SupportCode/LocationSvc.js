function GEOLocationSVC2() {}
GEOLocationSVC2.prototype = {
    run:function(){
      this.refreshLocation();
    },
    startWatching:function(){
        var options = {
            frequency: 1000,
            enableHighAccuracy: true
        },that = this;
		navigator.geolocation.watchPosition(function() {that._onSuccess.apply(that, arguments);}, function() {that._onError.apply(that, arguments);}, options);
	},
    _onSuccess:function(position){
        var apiKey ="8clvJAPz7Og7DgU5";
        var el = new Everlive(apiKey);
        var LocationDataSource= new kendo.data.DataSource({
            type: "everlive",
            transport: { typeName: "Locations"}
        });
        var LocationParam = new Everlive.GeoPoint(position.coords.longitude, position.coords.latitude);
        LocationDataSource.add({ Location: LocationParam });
        LocationDataSource.one("sync", this.close);
        LocationDataSource.sync();
	},
	_onError:function(error) {
		alert(error);
	},
};
