class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user=current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render json: @user
    else
      Rails.logger.error('This thing broke cause I am stupid')
    end
  end

  def user_update
      @user = current_user
      if @user.update(user_params)
        if params['image'] != 'undefined'
          s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
          s3_bucket = ENV['BUCKET']
          image = params['image']
          begin
            ext = File.extname(image.tempfile)
            obj = s3.bucket(s3_bucket).object("avatars/#{@user.id}/#{image.original_filename}")
            obj.upload_file(image.tempfile, acl: 'public-read')
            @user.image = obj.public_url
            if @user.save
              render json: @user
            else
              Rails.logger.error('This thing broke cause I am stupid')
            end
          rescue => e
            render json: { errors: e }, status: 418
          end
        else
          @user.image = 'https://image.ibb.co/cMmewc/simple_logo.png'
          if @user.save
            render json: @user
          else
            Rails.logger.error('This thing broke cause I am stupid')
          end
        end
      else
        render json: { errors: @user.errors.full_messages.join(', ') }, status: 422
      end
    end

  private

  def user_params
    params.permit(
      :email,
      :password,
      :first_name,
      :last_name,
      :username,
      :phone_number,
      :security_question,
      :security_answer,
      :street,
      :city,
      :state,
      :zip,
      :image,
      )
  end
end
