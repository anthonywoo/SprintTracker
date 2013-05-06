TA.Views.NewStoryView = Backbone.View.extend({

  events: {
    "submit #story-form": "storySubmit"
  },

  render: function(){
    var newView = JST["stories/new"]();
    this.$el.html(newView)
    return this
  },

  storySubmit: function(event){
    event.preventDefault();
    this.makeParams();
    var newStory = new TA.Models.Story(this.makeParams());
    newStory.save();
    TA.Stores.BacklogStories.add(newStory);
    Backbone.history.navigate("#/main")
  },

  makeParams: function(){
    params = {}
    $(".story-input").each(function(i, el){
      params[$(el).attr("name")] = $(el).val()
    })
    return params
  }
})