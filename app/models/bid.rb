class Bid < ApplicationRecord
  belongs_to :worker
  belongs_to :job

  after_save { |bid| bid_notification(bid) }

  def bid_notification(bid)
    job = Job.find(bid.job_id)
    worker = Worker.find(bid.worker_id)
    message = "#{worker.name} sent a bid on '#{job.name}'"
    direction = "to_user"
    Notification.create(
      to: job.user_id,
      from: worker.id,
      message: message,
      direction: direction,
      data: bid.to_json,
      viewed: false,
    )
  end
end
