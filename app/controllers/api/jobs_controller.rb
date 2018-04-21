class Api::JobsController < ApplicationController
  def index
    @jobs = Job.order(created_at: :desc).limit(100)
    render json: @jobs
  end

  def show
    @job = Job.find(params[:id])
    render json: @job
  end

  def create
    @job = Job.new(job_params)
    @job.status = "bid"
    @job.active = true
    if @job.save(job_params)
      if params['photos'] != 'undefined'
        s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
        s3_bucket = ENV['BUCKET']
        photos = params['photos']
        begin
          obj = s3.bucket(s3_bucket).object("photos/jobs/#{photos.original_filename}")
          obj.upload_file(photos.tempfile, acl: 'public-read')
          @job.photos = obj.public_url
          if @job.save
            render json: @job
          else
            Rails.logger.error('Broken')
          end
        rescue => e
          render json: { errors: e }, status: 422
        end
      else
        @job.photos = 'https://image.ibb.co/cMmewc/simple_logo.png'
        if @job.save
        render json: @job
        else
          Rails.logger.error('It is broken again')
        end
      end
    else
      render json: { errors: @job.errors }, status: :unprocessable_entity
    end
  end


  def update
    @job = Job.find(params[:id])
    if @job.update(job_params)
      if params['photos'] != 'undefined'
        s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
        s3_bucket = ENV['BUCKET']
        photos = params['photos']
        begin
          ext = File.extname(photos.tempfile)
          obj = s3.bucket(s3_bucket).object("photos/#{@job.id}/#{photos.original_filename}")
          obj.upload_file(photos.tempfile, acl: 'public-read')
          @job.photos = obj.public_url
          if @job.save
            render json: @job
          else
            Rails.logger.error('Broken')
          end
        rescue => e
          render json: { errors: e }, status: 422
        end
      else
        @job.photos = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Facebook_default_female_avatar.gif'
        if @job.save
        render json: @job
        else
          Rails.logger.error('It is broken')
        end
      end
    else
      render json: { errors: @job.errors.full_messages.join(', ') }, status:422
    end
  end

 #TODO: this needs to be refactored to search Jobs but for now
 #Providers will be listed.
  def search
    job = params[:search]
    if job
      jobs = Job.where("category LIKE ?", "%#{job}%")
      render json: jobs
    else
      render json: []
    end
  end

  def destroy
    def destroy
      Job.find(params[:id]).destroy
    end
  end

  def available
    jobs = Job.where(active: true).order(created_at: :desc).page(params[:page])
    render json: { jobs: jobs, total_pages: jobs.total_pages }
  end

  def my_listings
    listings = Job.where(user_id: params[:id])
    render json: listings
  end

  private
    def job_params
      params.permit(
        :name,
        :description,
        :location,
        :photos,
        :urgent,
        :category,
        :status,
        :active,
        :insurance,
        :bbb_approved,
        :distance,
        :rating,
        :user_id,
        :id
      )
    end
end
