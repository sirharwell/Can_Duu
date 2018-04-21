Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :jobs
    get 'search_job_suggestions', to: 'jobs#search'
    get 'available_jobs', to: 'jobs#available'
    get 'my_listings', to: 'jobs#my_listings'
    put '/job_update', to: 'job#job_update'
    resources :workers
    get 'user_worker_info', to: 'workers#user_worker_info'
    get 'search_worker_suggestions', to: 'workers#search'
    get 'index_workers', to: 'workers#index'
    resources :bids
    resources :bid_requests
    get 'add_worker_to_bid', to: 'bid_requests#add_worker_to_bid'
    get 'provider_notifications', to: 'notifications#provider_notifications'
    get 'user_notifications', to: 'notifications#user_notifications'
    resources :notifications, only: [:destroy]
    put 'notifications/:id/viewed', to: 'notifications#viewed'
    post 'request_to_bid', to: 'notifications#request_to_bid'
    post 'accept_bid_request', to: 'notifications#accept_bid_request'
    post 'reject_bid_request', to: 'notificaitons#reject_bid_request'
    put '/profile_update', to: 'users#update'
    put '/user_update', to: 'users#user_update'

  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
