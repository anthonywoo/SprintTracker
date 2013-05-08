TA.Views.NewStoryView = Backbone.View.extend({
  //don't think i'm using this anymore - need to check
  events: {
    "keypress #tag-input": "addTag",
    "submit #story-form": "storySubmit"
  },

  render: function(){
    var newView = JST["stories/new"]();
    this.$el.html(newView)
    return this
  },

  addTag: function(event){
    event.preventDefault
    console.log(event)
  }

  // storySubmit: function(event){ #MOVED TO STORYVIEW
  //   event.preventDefault();
  //   this.makeParams();
  //   var newStory = new TA.Models.Story(this.makeParams());
  //   newStory.save();
  //   TA.Stores.BacklogStories.add(newStory);
  //   Backbone.history.navigate("#/main")
  // },

  // makeParams: function(){
  //   params = {}
  //   $(".story-input").each(function(i, el){
  //     params[$(el).attr("name")] = $(el).val().html_safe
  //   })
  //   return params
  // }
})