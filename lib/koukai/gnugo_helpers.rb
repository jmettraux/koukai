
#
# koukai/gnugo_helpers

module Koukai

  module GnuGoHelpers

    def gnugoes

      $goes ||= {}
    end

    def gnugo

      gnugoes[session[:session_id].to_s] ||= Koukai::GnuGo.new
    end
  end
end

