class Worker < ApplicationRecord
  has_many :bids
  belongs_to :user
end
