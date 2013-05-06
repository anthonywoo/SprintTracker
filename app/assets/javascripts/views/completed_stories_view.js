TA.Views.CompletedStoriesView = Backbone.View.extend({

  render: function(){
    var rendered = JST["stories/completed"]({
      stories: this.collection
    });
    this.$el.html(rendered);
    return this
  }

})