require 'rubygems'
require 'sinatra'

use Rack::Logger

helpers do
  def logger
    request.logger
  end
end

get '/' do
  logger.info params
end
