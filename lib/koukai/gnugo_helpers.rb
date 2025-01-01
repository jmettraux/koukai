
#
# koukai/gnugo_helpers

module Koukai

  module GnuGoHelpers

    def gnugo

      session[:gnugo] ||= Koukai::GnuGo.new
    end
  end
end

