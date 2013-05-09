window.TA = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Stores: {},

  initialize: function ($complete, $current, $backlog, stories) {
    var allStories = new TA.Collections.Stories(stories)
    var completedStories = allStories.where({story_status_id: 3});
    var startedStories = allStories.where({story_status_id: 2});
    var backlogStories = allStories.where({story_status_id: 1});

    TA.Stores.AllStories = allStories
    TA.Stores.CurrentStory = new TA.Models.Story();

    // TA.Stores.AppController = {
    //   setCurrentStory: function(story) {

    //   }
    // }

    // _.extend(TA.Stores.AppController, Backbone.events)

    // AppController.trigger('asdfsdf')

    // TA.setCurrentStory(story)

      // Backbone.trigger('currentStory:change')
      // .listenTo(Backbone, 'currentStory:change', callback)
        

    TA.Stores.CompletedStories = new TA.Collections.Stories(completedStories);
    TA.Stores.StartedStories = new TA.Collections.Stories(startedStories);
    TA.Stores.BacklogStories = new TA.Collections.Stories(backlogStories);
    new TA.Routers.MainRouter($complete, $current, $backlog);
    Backbone.history.start();
  }
};