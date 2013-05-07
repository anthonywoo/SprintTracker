TA.Views.BacklogStoriesView = Backbone.View.extend({
  initialize: function(){
    TA.Stores.BacklogStories.on("add", this.render.bind(this))
    TA.Stores.BacklogStories.on("change", this.render.bind(this))
    TA.Stores.BacklogStories.on("remove", this.render.bind(this))
  },

  events: {
    "dblclick .story-title": "setCurrentStoryView",
    "dropbacklog": "dropbacklog"
  },

  render: function(){
    var backlogView = JST["stories/backlog"]({backlogStories: this.collection});
    this.$el.html(backlogView);

    return this
  },

  setCurrentStoryView: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"))
    TA.Stores.CurrentStory.set("current", selectedStory)
  },

  dropbacklog: function(event, new_index){
    var model_id = $(event.target).attr("data-id");
    
    var model = this.collection.get(model_id);
    debugger
    this.collection.remove(model);
    this.collection.each(function (model, index) {
      var position = index;
      if (index >= new_index)
          position += 1;
      model.set('position', position);
    });            
    model.set('position', new_index);
    this.collection.add(model, {at: new_index});
    this.collection.each(function (model){
      if (model.changedAttributes())
        model.save();
    })
  }
    
})