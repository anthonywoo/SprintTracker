TA.Collections.Stories = Backbone.Collection.extend({
  model: TA.Models.Story,
  url: "/stories",
  comparator: function(model) {
    return model.get('position');
  }
})