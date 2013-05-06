class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title
      t.string :description
      t.integer :points
      t.references :story_type
      t.references :story_status

      t.timestamps
    end
    add_index :stories, :story_type_id
    add_index :stories, :story_status_id
  end
end
