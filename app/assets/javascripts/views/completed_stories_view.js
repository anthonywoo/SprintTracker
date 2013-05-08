TA.Views.CompletedStoriesView = Backbone.View.extend({

  initialize: function(){
    TA.Stores.CompletedStories.on("remove", this.render.bind(this))
    TA.Stores.CompletedStories.on("add", this.render.bind(this))
    TA.Stores.CompletedStories.on("change", this.render.bind(this))
    this.$el.sortable({
                        connectWith: ["#current-items", "#backlog-items"],
                        update: function(event, ui){
                          console.log("COMPLETED")
                          ui.item.trigger('dropcomplete', ui.item.index());
                        }
                      })
  },

  id: "completed-items",

  events: {
    "dblclick .story-title": "setCurrentStoryView",
    "dropcomplete": "dropComplete"
  },

  render: function(){
    var rendered = JST["stories/completed"]({
      stories: this.collection,
      totalPoints: this.getTotalPoints()
    });
    this.$el.html(rendered);
    return this
  },

  setCurrentStoryView: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"))
    TA.Stores.CurrentStory.set("current", selectedStory)
  },

  getTotalPoints: function(){
    var points = 0
    TA.Stores.CompletedStories.each(function(model){
      points += model.get("points");
    })
    return points
  },

  dropComplete: function(event, new_index){
    var model_id = $(event.target).attr("data-id");
    var selModel = this.collection.get(model_id);
    if (selModel){
      this.sameCatDrop(selModel, new_index)
    } else {
      this.diffCatDrop(model_id, new_index)
    }
  },

  sameCatDrop: function(selModel, new_index){
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
  },

  diffCatDrop: function(model_id, new_index){
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
    selModel.set("story_status_id", 3);
    selModel.set("completion_date", new Date())
    this.collection.add(selModel, {at: new_index});
    this.collection.each(function (model){
      if (model.changedAttributes())
        model.save();
    })
  }

})