class Api::NotificationsController < ApplicationController
  def provider_notifications
    notifications = Notification
      .where(to: params[:id])
      .order(viewed: :asc)
    @notifications = notifications.select { |note|
      note.direction == "to_provider" || note.direction == "return_to_provider"
    }
    render json: @notifications
  end

  def user_notifications
    notifications = Notification
      .where(to: params[:id])
      .order(viewed: :asc)
    @notifications = notifications.select { |note|
      note.direction == "to_user" || note.direction == "return_to_user"
    }
    render json: @notifications
  end

  def viewed
    notification = Notification.find(params[:id])
    notification.update(viewed: true)
    render json: notification
  end

  def request_to_bid
    job = Job.find(params[:job_id])
    worker = Worker.find(params[:id])
    my_worker = worker.as_json
    my_worker["job_id"] = job.id
    notification = Notification.create(
      to: job.user_id,
      from: worker.id,
      message: "#{worker.name} requested to bid on #{job.name}",
      data: my_worker.to_json,
      direction: "to_user",
      viewed: false
    )
    render json: "Your request has been sent!"

  end

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
    render json: "Your request has been sent!"

  end

  def accept_bid_request
      job = Job.find(params[:job_id])
      worker = Worker.find(params[:id])
      notification = Notification.create(
        to: worker.id,
        from: job.user_id,
        data: job.id,
        message: "Your request for #{job.name} has been accepted",
        direction: "to_provider",
        viewed: false
      )
      render json: "Your acceptance has been sent!"

    end

    def reject_bid_request
        job = Job.find(params[:job_id])
        worker = Worker.find(params[:id])
        notification = Notification.create(
          to: worker.id,
          from: job.user_id,
          data: job.id,
          message: "Your request for #{job.name} has been rejected",
          direction: "to_provider",
          viewed: false
        )
        render json: "Your rejection has been sent!"

      end

  def destroy
    @notice = Notification.find(params[:id])
    @notice.destroy
    render json: @notice
  end
end
