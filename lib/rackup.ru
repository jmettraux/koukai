
#
# rackup.ru

require 'rack'
require 'sinatra/base'

$: << 'lib'

require 'koukai'

run Koukai::Endpoints

