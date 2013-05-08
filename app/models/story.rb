class Story < ActiveRecord::Base
  belongs_to :story_type
  belongs_to :story_status
  attr_accessible :description, :title, :points, :story_type_id, :story_status_id, :position, :completion_date

  before_save :set_position

  validates :title, :description, :presence => true
  protected

  def set_position
    self.position ||= 1 + (Story.where('story_status_id=?',story_status_id).maximum(:position) || 0)
  end
end
