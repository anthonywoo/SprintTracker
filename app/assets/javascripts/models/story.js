TA.Models.Story = Backbone.Model.extend({
  urlRoot: "/stories",
  
  validate: function(attrs, options) {
    if (isNaN(attrs.points)) {
      return "Points must be an integer";
    };
    if (attrs.title === ""){
      return "Title can't be empty"
    };
  }
})