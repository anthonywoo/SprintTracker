TA.Models.Story = Backbone.RelationalModel.extend({
  urlRoot: "/stories",
  
  relations: [{
    type: Backbone.HasMany,
    key: 'tag_names',
    keySource: "tags",
    keyDestination: 'tag_names',
    relatedModel: TA.Models.Tag,
    collectionType: TA.Collections.Tags,
    includeInJSON: 'name'
  }],
  
  validate: function(attrs, options) {
    if (isNaN(attrs.points)) {
      return "Points must be an integer";
    };
    if (attrs.title === ""){
      return "Title can't be empty"
    };
  }
})