
#
# koukai/endpoints.rb


class Koukai::Endpoints < Sinatra::Base

  enable :sessions

  get '/' do

    'hello ' + session.inspect
  end

  get '/console' do

    slim File.read('app/views/console.slim')
  end
end

