TA.Views.StoryView = Backbone.View.extend({

  initialize: function(){
    TA.Stores.CurrentStory.on("change:current", this.render)
  },

  events: {

  },

  render: function(){
    
  }

})