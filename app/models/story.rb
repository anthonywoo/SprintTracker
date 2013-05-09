class Story < ActiveRecord::Base
  belongs_to :story_type
  belongs_to :story_status
  attr_accessible :description, :title, :points, :story_type_id, :story_status_id, :position, :completion_date, :tag_names

  before_save :set_position

  has_many :taggings
  has_many :tags, :through => :taggings

  validates :title, :story_type_id, :story_status_id, :presence => true

  # def set_tags(tags)
  #   tags = tags.uniq
  #   tags.map! do |tag|
  #     Tag.find_or_create_by_name(tag)
  #   end
  #   binding.pry
  #   self.tags = tags
  # end

  def tag_names=(tags)
    tags = tags.uniq
    tags.map! do |tag|
      Tag.find_or_create_by_name(tag)
    end
    self.tags = tags
  end

  protected

  def set_position
    self.position ||= 1 + (Story.where('story_status_id=?',story_status_id).maximum(:position) || 0)
  end
end
