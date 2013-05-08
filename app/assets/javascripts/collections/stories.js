TA.Collections.Stories = Backbone.Collection.extend({
  model: TA.Models.Story,
  url: "/stories",
  comparator: function(model) {
    return model.get('position');
  },

  sumRemainingPoints: function(date){

    var stories = this.filter(function(story) {  
                              return (story.get("completion_date") === null) || (new Date(story.get("completion_date")) > date);
                            });
    var pts = 0
    _.each(stories,function(story){pts += story.get("points")})
    return pts
  },

  //How to get remaining points if given a day
  //

})