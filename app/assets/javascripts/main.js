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

    TA.Stores.CurrentStory = new TA.Models.Story();
    TA.Stores.CompletedStories = new TA.Collections.Stories(completedStories);
    TA.Stores.StartedStories = new TA.Collections.Stories(startedStories);
    TA.Stores.BacklogStories = new TA.Collections.Stories(backlogStories);

    new TA.Routers.MainRouter($complete, $current, $backlog);
    Backbone.history.start();
  }
};