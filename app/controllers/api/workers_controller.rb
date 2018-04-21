class Api::WorkersController < ApplicationController


  def index
    render json: Worker.all
  end

  def show
    provider = Worker.find(params[:id])
    render json: provider
  end

  def search
    provider = params[:search]

    if params[:id] != "false"
      user = User.find(params[:id])
    else
      user = "none"
    end

    if user != "none" && !!(user.favorites)
      favorites = favorite_params(user.favorites, provider)
    end

    if params[:filters] != "{}"
      workFilters = JSON.parse(params[:filters])
      providers = filter_params(workFilters, provider, user)
    else
      providers = category_params(provider)
    end

    if providers && favorites
      search = [ providers, favorites ]
    else
      search = [ providers, [] ]
    end

    render json: search
  end

  def category_params(category)
    provider = category
    providers = []
    workers = Worker.where("category LIKE ?", "%#{provider}%")
    workers.each do |worker|
      providers << worker
    end
    return providers
  end

  def favorite_params(favString, category)
    favorites = []
    favArray = favString.split(',')
    favArray.each do |fav|
      worker = Worker.where(user_id: fav, category: category)
      favorites << worker
    end
    filtered = favorites.reject { |fav| fav.length < 1 }
    return filtered
  end

  def filter_params(filters, category, user)
    bbb_approved = filters['BBBAproved']
    bgcheck = filters['backgroundCheck']
    # radius = filters['radiusSize'] #TODO: add geocode gem to get distance to consumer
    rating = filters['rating']
    workers = Worker.where("category LIKE ? AND rating >= ?", "%#{category}%", "#{rating}")
    # if user != "none"
    #   u_address = user.street + ' ' + user.city + ', ' + user.state + ' ' + user.zip
    #   workers.each do |worker|
    #     w_address = worker.street + ' ' + worker.city + ', ' + worker.state + ' ' + worker.zip
    #     a = Geokit::Geocoders::GoogleGeocoder.geocode u_address
    #     b = Geokit::Geocoders::GoogleGeocoder.geocode w_address
    #     c = b.distance_to(a).floor
    #     binding.pry
    #   end
    # end
    if bbb_approved
      if bgcheck #TODO:this needs to be changed to be insurance
        work_array = workers.select do |worker|
          worker.bbb_approved == true && worker.insurance == true
        end
      else
        work_array = workers.select do |worker|
          worker.bbb_approved == true
        end
      end
    else
      if bgcheck #TODO:this needs to be changed to be insurance
        work_array = workers.select do |worker|
          worker.insurance == true
        end
      else
        work_array = workers
      end
    end
    return work_array
  end

  def user_worker_info
    user_info = params[:id]
    if user_info
      info = Worker.where("user_id = ?", "#{user_info}")
      render json: info[0]
    else
      render json: []
    end
  end

  def update
    @worker= Worker.find(params[:id])
    if @worker.update(worker_params)
      if params['logo'] != 'undefined'
        s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
        s3_bucket = ENV['BUCKET']
        logo = params['logo']
        begin
          obj = s3.bucket(s3_bucket).object("logo/#{@worker.id}/#{logo.original_filename}")
          obj.upload_file(logo.tempfile, acl: 'public-read')
          @worker.logo = obj.public_url
          if @worker.save
            render json: @worker
          else
            Rails.logger.error('Broken')
          end
        rescue => e
          render json: { errors: e }, status: 422
        end
      else
        @worker.logo = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Facebook_default_female_avatar.gif'
        if @worker.save
        render json: @worker
        else
          Rails.logger.error('It is broken')
        end
      end
    else
      render json: { errors: @worker.errors.full_messages.join(', ') }, status:422
    end
  end

  private

    def worker_params
      params.permit(
        :name,
        :bio,
        :category,
        :phone_number,
        :email,
        :insurance,
        :bbb_approved,
        :service_area,
        :address,
        :city,
        :state,
        :street,
        :zip,
        :logo)
    end

end
