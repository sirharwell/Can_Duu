class CreateBidRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :bid_requests do |t|
      t.string :worker_ids
      t.belongs_to :job, foreign_key: true
      t.string :status, :default => 'awaiting reply'

      t.timestamps
    end
  end
end
