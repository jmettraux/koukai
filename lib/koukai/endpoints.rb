
#
# koukai/endpoints.rb


class Koukai::Endpoints < Sinatra::Base

  enable :sessions
  #use Rack::Session::Pool, :expire_after => 24 * 60 * 60

  set :views, 'views/'
  set :public_folder, 'public/'

  #use Rack::Protection, except: :json_csrf

  #
  # helpers

  helpers do

    include Koukai::SlimHelpers
    include Koukai::GnuGoHelpers
  end

  #disable :dump_errors
  disable :show_exceptions

  #error StandardError do
  #  err = env['sinatra.error']
  #  puts 'v' * 80
  #  puts err
  #  puts "---rrr---"
  #  puts err.backtrace
  #  puts '^' * 80
  #end

  #def body_string
  #  #request.body.rewind
  #  request.body.read
  #end

  def body_data

    JSON.parse(request.body.read)
  end

  def json(o)

    content_type 'application/json; charset=UTF-8'

    JSON.dump(o)
  end

  #
  # the actual endpoints

  get '/' do

    'hello ' + session.inspect
  end

  get '/console' do

    slim :console
  end

  get '/goban' do

    slim :goban
  end

  post '/actions' do

    json gnugo.post(body_data)
  end
end

