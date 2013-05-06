TA.Views.StoryView = Backbone.View.extend({

  initialize: function(){
    TA.Stores.CurrentStory.on("change:current", this.render.bind(this))
  },

  events: {
    "click .new-story": "renderNewStoryTemplate",
    "submit #story-form": "storySubmit",
    "submit #story-update-form": "storyUpdate",
    "click #cancel": "cancelStory"
  },

  render: function(){
    var storyView = JST["stories/show"]({story: TA.Stores.CurrentStory.get("current")});
    this.$el.html(storyView); //
    
    return this
  },

  renderNewStoryTemplate: function(){
    var newStoryView = JST["stories/new"]();
    this.$el.html(newStoryView)
    return this
  },

  storySubmit: function(event){
    event.preventDefault();
    this.makeParams();
    var newStory = new TA.Models.Story(this.makeParams());
    newStory.save();
    TA.Stores.BacklogStories.add(newStory);
  },

  storyUpdate: function(event){
    event.preventDefault();
    var currentStory = TA.Stores.CurrentStory.get("current")
    currentStory.set(this.makeParams());
    currentStory.save();
    TA.Stores.CurrentStory.set("current", null)
  },

  makeParams: function(){
    params = {}
    $(".story-input").each(function(i, el){
      params[$(el).attr("name")] = $(el).val()
    })
    return params
  },

  cancelStory: function(event){
    TA.Stores.CurrentStory.set("current", null)
    this.render();
  }

})