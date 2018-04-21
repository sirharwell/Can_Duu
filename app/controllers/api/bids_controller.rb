class Api::BidsController < ApplicationController

  def create
    @bid = Bid.new(bid_params)

    if @bid.save
      render json: @bid
    else
      render json: { errors: @bid.errors }, status: :unprocessable_entity
    end
  end

  private
    def bid_params
      params.permit(
        :start_date,
        :end_date,
        :length,
        :price,
        :milestones,
        :comments,
        :job_id,
        :worker_id
      )
    end
end
