TA.Views.CompletedStoriesView = Backbone.View.extend({

  events: {
    "dblclick .story-title": "setCurrentStoryView"
  },

  render: function(){
    var rendered = JST["stories/completed"]({
      stories: this.collection
    });
    this.$el.html(rendered);
    return this
  },

  setCurrentStoryView: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"))
    TA.Stores.CurrentStory.set("current", selectedStory)
  }

})