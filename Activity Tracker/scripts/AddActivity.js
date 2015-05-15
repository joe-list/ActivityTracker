(function () 
{

    window.AddActivity = {
    models: 
    {
        AddActivity: 
        {
          Header: "Add Activity",
          Title:"",
          Description:"",
          Start:  "",
          End:  "",
          Location: ""
        }
    },
        
    add:function()
    {
      /*if (!this.Title) {
          navigator.notification.alert("Please provide a Title.");
          return;
      }

      ActivityDataSource.add({ Title: this.Title, Description: this.Description, Start: this.Start, End: this.End, Location: this.});
      ActivityDataSource.one("sync", this.close);
      ActivityDataSource.sync();

      this.Title = "";
      this.Description = "";*/
        
        alert("Clicked the Add Button");

    },
        
    close:function() 
    {
      /*this.Title = "";
      this.Description = "";

      window.location.href = "views/Home.html";*/
        
        alert("Clicked the Close Button");
    },
        
    show: function()
    {
            
    },

    aftershow: function()
    {

    }
	};
}());