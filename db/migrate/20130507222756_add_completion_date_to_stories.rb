class AddCompletionDateToStories < ActiveRecord::Migration
  def change
    add_column :stories, :completion_date, :date
  end
end
