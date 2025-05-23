
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
    include Koukai::EngineHelpers
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

  def param(key)

    params[key]
  end

  #def param_i(key)
  #  v = params[key]
  #  v ? v.to_i : nil
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

  def jscript(paths)

    content_type 'application/javascript'

    paths.map { |path| File.read(path) }.join("\n")
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

  post '/gtp/:engine/:id' do

    json engine(param(:engine), param(:id)).post(body_data)
  end

  get '/script/goban' do

    jscript %w[
      scripts/koukai.js
      scripts/goban.js
      scripts/svg.js
      scripts/div_component.js
      scripts/go_board.js
      scripts/score_tracker.js
      scripts/v_score_tracker.js
        ]
  end

  get '/script/console' do

    jscript %w[
      scripts/koukai.js
      scripts/console.js
        ]
  end
end

