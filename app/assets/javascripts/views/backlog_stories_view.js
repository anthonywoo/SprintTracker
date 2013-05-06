TA.Views.BacklogStoriesView = Backbone.View.extend({
  initialize: function(){
    TA.Stores.BacklogStories.on("add", this.render.bind(this))
    TA.Stores.BacklogStories.on("change", this.render.bind(this))
    TA.Stores.BacklogStories.on("remove", this.render.bind(this))
  },

  events: {
    "click .story-title": "setCurrentStoryView"
  },

  render: function(){
    var backlogView = JST["stories/backlog"]({backlogStories: this.collection});
    this.$el.html(backlogView);
    return this
  },

  setCurrentStoryView: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"))
    TA.Stores.CurrentStory.set("current", selectedStory)

  }

})