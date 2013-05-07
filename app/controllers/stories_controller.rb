class StoriesController < ApplicationController

  respond_to :json
  respond_to :html, only: [:index, :create]

  def index
    @stories = Story.order(:position).all
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => @stories }
    end
  end

  def create
    story = Story.new(params[:story])
    binding.pry
    if story.save
      render :json => story
    else
      render :json => story.errors, status: 422
    end
  end

  def update
    story = Story.find(params[:id])
    if story.update_attributes(params[:story])
      render :json => story
    else
      render :json => story.errors, status: 422
    end
  end

  def destroy
    story = Story.find(params[:id])
    if story.destroy
    else
      render :json => story.errors, status: 422
    end
  end


end
