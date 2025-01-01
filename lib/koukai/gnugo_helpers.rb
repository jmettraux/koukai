
#
# koukai/gnugo_helpers

module Koukai

  module GnuGoHelpers

    def gnugo

      @gnugo ||= Koukai::GnuGo.new
    end
  end
end

