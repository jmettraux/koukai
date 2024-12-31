
#
# koukai/endpoints.rb


class Koukai::Endpoints < Sinatra::Base

  enable :sessions

  set :views, 'views/'

  #
  # slim helpers

  helpers do

    include Koukai::SlimHelpers
  end

  #
  # the actual endpoints

  get '/' do

    'hello ' + session.inspect
  end

  get '/console' do

    slim :console
  end
end

