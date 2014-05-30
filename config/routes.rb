Rails.application.routes.draw do

  root 'pages#main'
  get 'pages/main'

  # Temporary Login Solution for CODAP hosted simultaneously with Rails (in Public folder)
  post '/DataGames/api/auth/login', to: 'auth#index'

  namespace :api, defaults: {format: 'json'} do

    # To allow CORS request. The browser first sends an Options request which is matched to logs#options
    match 'logs', to: 'logs#options', via: [:options]
    
    # To send log(s) and get all logs stored in database
    resources :logs, except: [:destroy, :edit, :update]
    
    # To filter data and send just filtered data to applications
    post 'filter', to: 'filter#index'

  end

  resources :logs

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
