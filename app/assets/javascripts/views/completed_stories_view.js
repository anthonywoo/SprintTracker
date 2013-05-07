TA.Views.CompletedStoriesView = Backbone.View.extend({

  events: {
    "dblclick .story-title": "setCurrentStoryView",
    "dropcomplete": "dropcomplete"
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
  },

  dropcomplete: function(event, new_index){
    var model_id = $(event.target).attr("data-id");
    
    var selModel = this.collection.get(model_id);
    if (selModel){
      this.collection.remove(selModel);
      this.collection.each(function (model, index) {
        var position = index;
        if (index >= new_index)
            position += 1;
        model.set('position', position);
      });            
      selModel.set('position', new_index);
      this.collection.add(selModel, {at: new_index});
      this.collection.each(function (model){
        if (model.changedAttributes())
          model.save();
      })
    } else {
      selModel = TA.Stores.StartedStories.get(model_id) || TA.Stores.BacklogStories.get(model_id) ;
      TA.Stores.BacklogStories.remove(selModel);
      TA.Stores.StartedStories.remove(selModel) 
      this.collection.each(function (model, index) {
        var position = index;
        if (index >= new_index)
            position += 1;
        model.set('position', position);
      });            
      selModel.set('position', new_index);
      selModel.set("story_status_id", 1);
      this.collection.add(selModel, {at: new_index});
      this.collection.each(function (model){
        if (model.changedAttributes())
          model.save();
      })
    }
  }

})