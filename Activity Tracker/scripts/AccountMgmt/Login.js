(function () {
    
    var apiKey = "8clvJAPz7Og7DgU5";
    var el = new Everlive(apiKey);
    
    window.Login = {
        models: 
        {
            Login: 
            {
              title: 'Login',
                
              models:
              {
                  Activity:
                  {
                      
                  }
              },
                
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
              el.Users.login(this.username, this.password,
                  function(data)
                  {
                      navigator.notification.alert("You have been Authenticated.");
                  	  this.navigate('views/Activity.html');
                  }, 
                  function() 
                  {
                      navigator.notification.alert("Unfortunately we could not find your account.");
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