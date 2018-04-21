class Api::BidRequestsController < ApplicationController

  def create
    @bid_request = BidRequest.new(bid_request_params)

    if @bid_request.save
      render json: @bid_request
    else
      render json: { errors: @bid_request.errors }, status: :unprocessable_entity
    end
  end

  # def update
  #   @bid_request = BidRequest.find(params[:id])
  #   @bid_request.update(worker_ids: params[:worker_ids])
  #   render json: @bid_request
  # end

  private
    def bid_request_params
      params.permit(:worker_ids, :job_id)
    end

end
