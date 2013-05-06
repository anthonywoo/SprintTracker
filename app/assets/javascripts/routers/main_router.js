TA.Routers.MainRouter = Backbone.Router.extend({
  routes: {
    "": "main"
  },

  main: function(){
    var view = new TA.Views.CompletedStoriesView({
      collection: TA.Stores.CompletedStories
    });
    $("#complete").html(view.render().$el);
  }


})