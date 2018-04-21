class Job < ApplicationRecord
  belongs_to :user
  has_many :bid_requests, dependent: :destroy
  has_many :bids, dependent: :destroy
end
