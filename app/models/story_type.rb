class StoryType < ActiveRecord::Base
  attr_accessible :name
  has_many :stories
end
