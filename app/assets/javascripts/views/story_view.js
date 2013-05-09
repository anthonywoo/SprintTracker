TA.Views.StoryView = Backbone.View.extend({

  initialize: function(){
    TA.Stores.CurrentStory.on("change:current", this.render.bind(this))
  },

  events: {
    "click .new-story": "renderNewStoryTemplate",
    "submit #story-form": "storySubmit",
    "submit #story-update-form": "storyUpdate",
    "click #cancel": "cancelStory",
    "click #delete": "deleteStory",
    "keypress #tag-input": "addTag", 
    "keyup #story-search": "searchStories",
    "click .search-result": "viewSearchResult"
  },

  render: function(){
    if (TA.Stores.CurrentStory.get("current")){
      var storyView = JST["stories/show"]({story: TA.Stores.CurrentStory.get("current")})
    } else {
      var storyView = JST["stories/no_story"]({})
    }
    
    this.$el.html(storyView); //
    return this
  },

  renderNewStoryTemplate: function(){
    var newStoryView = JST["stories/new"]();
    this.$el.html(newStoryView)
    return this
  },

  storySubmit: function(event){
    event.preventDefault();
    this.makeParams();
    var newStory = new TA.Models.Story(this.makeParams());
    if (newStory.isValid()){

      //check tag store to see if tags exist - if not, create them. 
      newStory.save();
      TA.Stores.BacklogStories.add(newStory);
      this.render();
    } else {
      $("#new-error-messages").html(newStory.validationError);
    }
  },

  storyUpdate: function(event){
    event.preventDefault();
    var currentStory = TA.Stores.CurrentStory.get("current")
    var clonedStory = currentStory.clone()
    clonedStory.set(this.makeParams());
    if (clonedStory.isValid()){
      currentStory.set(this.makeParams());
      currentStory.save();
      TA.Stores.CurrentStory.set("current", null)
    } else {
      $("#update-error-messages").html(clonedStory.validationError)
    }
  },

  addTag: function(event){
    if (event.keyCode === 13){
      event.preventDefault();
      var hiddenValue = '<input type="hidden" name="tag_names" class="tag-input" value="' + $("#tag-input").val() + '">'
      var tagSpan = '<span class="label label-info tag-label temp-tag">'+ $("#tag-input").val() + hiddenValue + '</span>'
      $("#tag-area").append(tagSpan)
      $("#tag-input").val("")
    }
  },

  searchStories: function(event){
    var searchString = $("#story-search").val();
    if (searchString !== "") {
      var regexString = new RegExp(searchString, "i")
      var results = TA.Stores.AllStories.filter(function(story){return story.get("title").match(regexString)})
      if (results.length === 0) { 
        $("#search-results").html("") 
        return
       }
      var resultsView = JST["stories/search_results"]({results: results})
      $("#search-results").html(resultsView)
    } else {
      $("#search-results").html("")
    }
  },

  viewSearchResult: function(event){
    var dataId = $(event.target).attr('data-id');
    var selStory = TA.Stores.CompletedStories.get(dataId) || TA.Stores.StartedStories.get(dataId) || 
                   TA.Stores.BacklogStories.get(dataId);
    TA.Stores.CurrentStory.set("current", selStory);
  },

  makeParams: function(){
    params = {}
    $(".story-input").each(function(i, el){
      params[$(el).attr("name")] = $(el).val()
    })
    var tags = []
    $(".tag-input").each(function(i, el){
      tags.push({name: $(el).val()})
    })
    params["tag_names"] = tags
    return params
  },

  cancelStory: function(event){
    TA.Stores.CurrentStory.set("current", null)
    this.render();
  },

  deleteStory: function(){
    var currentStory = TA.Stores.CurrentStory.get("current");
    TA.Stores.CurrentStory.set("current", null);
    currentStory.destroy();
  }

})