class Story < ActiveRecord::Base
  belongs_to :story_type
  belongs_to :story_status
  attr_accessible :description, :title, :points, :story_type_id, :story_status_id
end
