class CreateBids < ActiveRecord::Migration[5.1]
  def change
    create_table :bids do |t|
      t.integer :price
      t.string :start_date
      t.string :end_date
      t.text :milestones
      t.text :comments
      t.string :status
      t.string :length
      t.belongs_to :worker, foreign_key: true
      t.belongs_to :job, foreign_key: true

      t.timestamps
    end
  end
end
