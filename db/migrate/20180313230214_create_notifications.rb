class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :to
      t.integer :from
      t.text :message
      t.text :data
      t.boolean :viewed
      t.string :direction

      t.timestamps
    end
  end
end
