class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.string :name
      t.text :description
      t.boolean :urgent
      t.boolean :insurance
      t.boolean :bbb_approved
      t.string :category
      t.integer :distance
      t.integer :rating
      t.string :photos
      t.belongs_to :user, foreign_key: true
      t.string :status
      t.boolean :active

      t.timestamps
    end
  end
end
