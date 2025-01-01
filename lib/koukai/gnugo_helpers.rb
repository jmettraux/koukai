
#
# koukai/gnugo_helpers

module Koukai

  module GnugoHelpers

    def gnugo

      @gnugo ||= Koukai::GnuGo.new
    end
  end
end

