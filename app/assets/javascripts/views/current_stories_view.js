TA.Views.CurrentStoriesView = Backbone.View.extend({

  initialize: function(){
    TA.Stores.StartedStories.on("remove", this.render.bind(this));
    TA.Stores.StartedStories.on("add", this.render.bind(this));
    TA.Stores.StartedStories.on("change", this.render.bind(this));
    this.$el.sortable({
                        connectWith: ["#completed-items", "#backlog-items"],
                        update: function(event, ui){
                          ui.item.trigger('dropcurrent', ui.item.index());
                        }
                      });
  },

  id: "current-items",

  events: {
    "dblclick .story-title": "setCurrentStoryView",
    "dropcurrent": "dropCurrent",
    "click #finish-story": "finishStory"
  },

  render: function(){
    var rendered = JST["stories/current"]({
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

  finishStory: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"));
    selectedStory.set("position", TA.Stores.CompletedStories.length * 2)
    selectedStory.set("story_status_id", 3)
    selectedStory.set("completion_date", new Date())
    TA.Stores.StartedStories.remove(selectedStory)
    TA.Stores.CompletedStories.add(selectedStory)
    selectedStory.save()
  },

  getTotalPoints: function(){
    var points = 0
    TA.Stores.StartedStories.each(function(model){
      points += model.get("points");
    })
    return points
  },

  dropCurrent: function(event, new_index){
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
    selModel = TA.Stores.CompletedStories.get(model_id) || TA.Stores.BacklogStories.get(model_id) ;
    TA.Stores.BacklogStories.remove(selModel);
    TA.Stores.CompletedStories.remove(selModel); 
    this.collection.each(function (model, index) {
      var position = index;
      if (index >= new_index)
          position += 1;
      model.set('position', position);
    });          
    selModel.set('position', new_index);
    selModel.set("completion_date", null);
    selModel.set("story_status_id", 2);
    this.collection.add(selModel, {at: new_index});
    this.collection.each(function (model){
      if (model.changedAttributes())
        model.save();
    })
  }

})