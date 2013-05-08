TA.Views.ChartView = Backbone.View.extend({

  render: function(){
    this.getChartData;
    var rendered = JST["chart"]({
      points: this.points,
      dates: this.sprintDates
    });
    this.$el.html(rendered);
    return this
  },

  getChartData: function(){
    var clonedStories = TA.Stores.CompletedStories.clone();
    var allStories1 = clonedStories.add(TA.Stores.StartedStories.toJSON(), {silent : true});
    var allStories2 = allStories1.add(TA.Stores.BacklogStories.toJSON(), {silent : true});
    this.sprintDates = ["2013-05-06", "2013-05-07", "2013-05-08", "2013-05-09", "2013-05-10", 
                        "2013-05-11", "2013-05-12", "2013-05-13", "2013-05-14", "2013-05-15"] //for now
    this.points = []
    var that = this
    _.each(this.sprintDates, function(date){ that.points.push(allStories2.sumRemainingPoints(new Date(date)))})

  }





})