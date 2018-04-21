class BidRequest < ApplicationRecord
  belongs_to :job

  after_save { |request| request_notification(request) }

  def request_notification(request)
    ids = request.worker_ids.split(',')
    job = Job.find(request.job_id)
    user = User.find(job.user_id)
    message = "#{user.username} requested you to bid on '#{job.name}'"
    direction = "to_provider"
    ids.each do |id|
      Notification.create(
        to: id,
        from: user.id,
        message: message,
        direction: direction,
        data: job.to_json,
        viewed: false
      )
    end
  end
end
