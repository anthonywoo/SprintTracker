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

end
