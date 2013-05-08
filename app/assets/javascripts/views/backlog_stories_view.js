TA.Views.BacklogStoriesView = Backbone.View.extend({
  initialize: function(){
    TA.Stores.BacklogStories.on("add", this.render.bind(this));
    TA.Stores.BacklogStories.on("change", this.render.bind(this));
    TA.Stores.BacklogStories.on("remove", this.render.bind(this));
    this.$el.sortable({
                        connectWith: ["#completed-items", "#current-items"],
                        update: function(event, ui){
                          console.log("backlog")
                          ui.item.trigger('dropbacklog', ui.item.index());
                        }
                      });
  },

  id: "backlog-items",
  
  events: {
    "dblclick .story-title": "setCurrentStoryView",
    "dropbacklog": "dropBacklog",
    "click #start-story": "startStory"
  },

  render: function(){
    var backlogView = JST["stories/backlog"]({
      backlogStories: this.collection, 
      totalPoints: this.getTotalPoints()
    });
    this.$el.html(backlogView);
    return this
  },

  startStory: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"));
    selectedStory.set("position", TA.Stores.StartedStories.length * 2)
    selectedStory.set("story_status_id", 2)
    TA.Stores.BacklogStories.remove(selectedStory)
    TA.Stores.StartedStories.add(selectedStory)
    selectedStory.save()
  },

  setCurrentStoryView: function(event){
    var selectedStory = this.collection.get($(event.target).attr("data-id"));
    TA.Stores.CurrentStory.set("current", selectedStory);
  },

  getTotalPoints: function(){
    var points = 0
    TA.Stores.BacklogStories.each(function(model){
      points += model.get("points");
    })
    return points
  },

  dropBacklog: function(event, new_index){
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
    selModel = TA.Stores.StartedStories.get(model_id) || TA.Stores.CompletedStories.get(model_id) ;
    TA.Stores.CompletedStories.remove(selModel);
    TA.Stores.StartedStories.remove(selModel) 
    this.collection.each(function (model, index) {
      var position = index;
      if (index >= new_index)
          position += 1;
      model.set('position', position);
    });            
    selModel.set('position', new_index);
    selModel.set("completion_date", null);
    selModel.set("story_status_id", 1);
    this.collection.add(selModel, {at: new_index});
    this.collection.each(function (model){
      if (model.changedAttributes())
        model.save();
    })
  }
    
})