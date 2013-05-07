TA.Views.StoryView = Backbone.View.extend({

  initialize: function(){
    TA.Stores.CurrentStory.on("change:current", this.render.bind(this))
  },

  events: {
    "click .new-story": "renderNewStoryTemplate",
    "submit #story-form": "storySubmit",
    "submit #story-update-form": "storyUpdate",
    "click #cancel": "cancelStory",
    "click #delete": "deleteStory"
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
    if (newStory.isValid()){
      newStory.save();
      TA.Stores.BacklogStories.add(newStory);
      this.render();
    } else {
      $("#new-error-messages").html(newStory.validationError);
    }
  },

  storyUpdate: function(event){
    event.preventDefault();
    var currentStory = TA.Stores.CurrentStory.get("current")
    var clonedStory = currentStory.clone()
    clonedStory.set(this.makeParams());
    if (clonedStory.isValid()){
      currentStory.set(this.makeParams());
      currentStory.save();
      TA.Stores.CurrentStory.set("current", null)
    } else {
      $("#update-error-messages").html(clonedStory.validationError)
    }
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
  },

  deleteStory: function(){
    var currentStory = TA.Stores.CurrentStory.get("current");
    TA.Stores.CompletedStories.remove(currentStory);
    TA.Stores.StartedStories.remove(currentStory);
    TA.Stores.BacklogStories.remove(currentStory);
    TA.Stores.CurrentStory.set("current", null);
    currentStory.destroy();
  }

})