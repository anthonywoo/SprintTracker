TA.Models.StoryType = Backbone.RelationalModel.extend({
  urlRoot: "/stories",
  
  relations: [{
    type: Backbone.HasMany,
    key: 'stories',
    relatedModel: TA.Models.Story,
    collectionType: TA.Collections.Stories,
    reverseRelation: {
      key: 'story_type',
      includeInJSON: 'id'
    }
  }]
})