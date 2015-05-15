(function () {
    
    var apiKey = "8clvJAPz7Og7DgU5";
    var el = new Everlive(apiKey);
    
    window.Registration = {
        models: 
        {
            Registration: 
            {
              title: 'Registration',
                
              submit: function()
              {
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
              
            }

        },
        show: function() 
        {
			
        },

        hide: function() 
        {

        },
       
    };
}());