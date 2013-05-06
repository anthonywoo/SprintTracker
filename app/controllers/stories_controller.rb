class StoriesController < ApplicationController

  respond_to :json
  respond_to :html, only: [:index, :create]

  def index
    @stories = Story.all
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => @stories }
    end
  end

  def create
    story = Story.new(params[:story])
    if story.save
      render :json => story
    else
      render :json => story.errors, status: 422
    end
  end
end
