TA.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "redirectToMain",
    "main": "main"
  },

  main: function(){
    this.clearAll();
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
  }


})