TA.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "redirectToMain",
    "main": "main",
    "chart": "chart"
  },

  main: function(){
    this.showAll();
    $("#chart-view").html("")
    var completedView = new TA.Views.CompletedStoriesView({
      collection: TA.Stores.CompletedStories
    });
    $("#complete").html(completedView.render().$el);

    var backlogView = new TA.Views.BacklogStoriesView({
      collection: TA.Stores.BacklogStories
    });
    $("#backlog").html(backlogView.render().$el);

    var currentView = new TA.Views.CurrentStoriesView({
      collection: TA.Stores.StartedStories
    })
    $("#current").html(currentView.render().$el);

    var currentStoryView = new TA.Views.StoryView({
      model: TA.Stores.CurrentStory.get("current")
    });
    $("#view-story").html(currentStoryView.render().$el);
  },

  new: function(){
    var newStoryView = new TA.Views.NewStoryView();
    $("#backlog").prepend(newStoryView.render().$el);
  },

  showAll: function(){
    $(".story-panel").show();
    $(".panel-title").show();
  },

  hideAll: function(){
    $(".story-panel").hide();
    $(".panel-title").hide();
  },

  chart: function(){
    this.hideAll();
    var chartView = new TA.Views.ChartView();
    chartView.getChartData();
    chartView.render();
    $("#chart-view").html(chartView.render().$el);
  },

  redirectToMain: function(){
    Backbone.history.navigate("#/main");
  }

})