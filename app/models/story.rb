class Story < ActiveRecord::Base
  belongs_to :story_type
  belongs_to :story_status
  attr_accessible :description, :title, :points, :story_type_id, :story_status_id, :position, :completion_date

  before_save :set_position

  has_many :taggings
  has_many :tags, :through => :taggings

  validates :title, :description, :presence => true

  def set_tags(tags)
    availableTags = Tag.where({:name => tags})
    all_tags = availableTags
    to_be_created_tags = tags.uniq - availableTags.map(&:name)
    to_be_created_tags.each do |tag_name|
      all_tags << Tag.create(name: tag_name)
    end
    self.tags = all_tags
  end

  protected

  def set_position
    self.position ||= 1 + (Story.where('story_status_id=?',story_status_id).maximum(:position) || 0)
  end
end
