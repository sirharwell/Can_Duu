class Notification < ApplicationRecord

  before_destroy { |notice|
    if notice.direction == "to_provider"
      decline_request(notice)
    else
      decline_bid(notice)
    end
  }

  def decline_request(notice)
    worker = Worker.find(notice.to)
    Notification.create(
      to: notice.from,
      from: notice.to,
      message: "#{worker.name} declined to bid",
      data: notice.data,
      viewed: false,
      direction: "return_to_user"
    )
  end

  def decline_bid(notice)
    user = User.find(notice.to)
    Notification.create(
      to: notice.from,
      from: notice.to,
      message: "#{user.username} declined your bid",
      data: notice.data,
      viewed: false,
      direction: "return_to_provider"
    )
  end

end
