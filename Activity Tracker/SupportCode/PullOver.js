(function() 
{
    var apiKey = "jifcWjRfh42Nk6W1";
    var el = new Everlive(apiKey);

    var ActivityDataSource = new kendo.data.DataSource({
      type: "everlive",
      transport: {typeName: "Activity"}
    });
    
    var LogDataSource = new kendo.data.DataSource({
    type: "everlive",
    transport: { typeName: "Log"}
    });

    function initialize() 
    { 
        window.loginView = kendo.observable({
          submit: function() {
              if (!this.username) {
                  navigator.notification.alert("Username is required.");

                  return;
              }
              if (!this.password) {
                  navigator.notification.alert("Password is required.");
                  return;
              }
              el.Users.login("joe.list", "Karley75",
                  function(data)
                  {
                      window.location.href = "#list";
                      ActivityDataSource.read();
                  }, 
                  function() 
                  {
                      navigator.notification.alert("Unfortunately we could not find your account.");
                  });
          }
        });
        
      window.registerView = kendo.observable({
      submit: function() {
      if (!this.username) {
          navigator.notification.alert("Username is required.");
          return;
      }
      if (!this.password) {
          navigator.notification.alert("Password is required.");
          return;
      }
      el.Users.register(this.username, this.password, { Email: this.email },
          function() {
              navigator.notification.alert("Your account was successfully created.");
              window.location.href = "#login";
          },
          function() {
              navigator.notification.alert("Unfortunately we were unable to create your account.");
          });
      }
    });
    window.passwordView = kendo.observable({
      submit: function() {
      if (!this.email) {
          navigator.notification.alert("Email address is required.");
          return;
      }
      $.ajax({
          type: "POST",
          url: "https://api.everlive.com/v1/" + apiKey + "/Users/resetpassword",
          contentType: "application/json",
          data: JSON.stringify({ Email: this.email }),
          success: function() {
              navigator.notification.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
              window.location.href = "#login";
          },
          error: function() {
              navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
          }
      });
      }
    });
        
      window.listView = kendo.observable({
      logout: function(event) {
          // Prevent going to the login page until the login call processes.
          event.preventDefault();
          el.Users.logout(function() {
              this.loginView.set("username", "" );
              this.loginView.set("password", "");
              window.location.href = "#login";
          }, function() {
              navigator.notification.alert("Unfortunately an error occurred logging out of your account.");
          });
      }
    });
        
        var app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            transition: "slide"
        });
            $("#activity-list").kendoMobileListView({
              dataSource: ActivityDataSource,
              template: "<div>#:Title#</div>"
            });
            
            
        navigator.splashscreen.hide();
    }
    
    window.addActivityView = kendo.observable({
      add: function() {
          if (!this.Title) {
              navigator.notification.alert("Please provide a Title.");
              return;
          }

          ActivityDataSource.add({ Title: this.Title, Description: this.Description, Start: this.Start, End: this.End });
          ActivityDataSource.one("sync", this.close);
          ActivityDataSource.sync();

          this.Title = "";
          this.Description = "";

           window.location.href = "#list";

      },
      close: function() {
          this.Title = "";
          this.Description = "";

          window.location.href = "#list";
      },
        show: function()
        {
                
        },
        
        aftershow: function()
        {

        }
    });
    
    window.GPSResults = new kendo.observable({
        add: function()
        {
            var geoApp = new GEOLocationSVC();
            geoApp.run();
        },
        
        close: function ()
        {
            window.location.href = "#list";
        }
        
    });
    
    window.ActivityMap = new kendo.observable({

        run: function()
        {
            
            
        },
        
        close: function ()
        {
            window.location.href = "#list";
        },
        
        Show: function()
        {
            var mapOptions = {
                credentials: "AsRYNFKf9cNxvyi7n6yCco2LdAuD2RU_e0KKJqfzUn93TG_BvVj38fleJtCVv58x",
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                center: new Microsoft.Maps.Location(43.069452, -89.411373),
                zoom: 11
            };
            var map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
        }
        
    });

    function initializeMap() 
    {
        // this is where the custom code will go for each mapping implementation
    }
    
    document.addEventListener("deviceready", initialize);

}());

