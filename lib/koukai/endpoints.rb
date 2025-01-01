
#
# koukai/endpoints.rb


class Koukai::Endpoints < Sinatra::Base

  enable :sessions

  set :views, 'views/'
  set :public_folder, 'public/'

  #
  # slim helpers

  helpers do

    include Koukai::SlimHelpers
    include Koukai::GnuGoHelpers
  end

  #
  # the actual endpoints

  get '/' do

    'hello ' + session.inspect
  end

  get '/console' do

    slim :console
  end

  post '/actions' do

    # TODO
  end
end

