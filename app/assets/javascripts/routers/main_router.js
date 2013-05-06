TA.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "redirectToMain",
    "main": "main"
  },

  main: function(){
    this.clearAll();
    console.log("MAIN")
    var completedView = new TA.Views.CompletedStoriesView({
      collection: TA.Stores.CompletedStories
    });
    $("#complete").html(completedView.render().$el);

    var backlogView = new TA.Views.BacklogStoriesView({
      collection: TA.Stores.BacklogStories
    });
    $("#backlog").html(backlogView.render().$el);

    var currentStoryView = new TA.Views.StoryView({
      model: TA.Stores.CurrentStory.get("current")
    });
    $("#view-story").html(currentStoryView.render().$el);
    var that = this
    // $(".draggable").draggable({ cursor: "crosshair", revert: "invalid"});
    // $(".sortable").sortable({
    //     update: function(event, ui){
    //       console.log("ASDASD")
    //       var sortParams = that.buildSortParams($(this).children())
          
    //     }
    //   })
  },

  new: function(){
    var newStoryView = new TA.Views.NewStoryView();
    $("#backlog").prepend(newStoryView.render().$el);
  },

  clearAll: function(){
    $("#complete").html("");
    $("#backlog").html("");
    $("started").html("");
  },

  redirectToMain: function(){
    Backbone.history.navigate("#/main")
  }, 

  buildSortParams: function(childrens){
    var params = []
    $.each(childrens, function(i, l){
      params.push($(l).attr("data-id"))
    })
    return params
  }


})