class CreateWorkers < ActiveRecord::Migration[5.1]
  def change
    create_table :workers do |t|
      t.string :name
      t.string :email
      t.string :phone_number
      t.boolean :insurance
      t.boolean :bbb_approved
      t.string :hours
      t.string :service_area
      t.string :category
      t.string :logo
      t.text :bio
      t.string :street
      t.string :zip
      t.string :city
      t.string :state
      t.belongs_to :user, foreign_key: true
      t.string :bank_account
      t.integer :rating

      t.timestamps
    end
  end
end
