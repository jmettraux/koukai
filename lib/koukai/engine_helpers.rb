
#
# koukai/engine_helpers

module Koukai

  module EngineHelpers

    def engines

      $engines ||= {}
    end

    def engine(name, id)

      kla =
        case name
        when /gnugo/i then Koukai::GnuGoEngine
        else Koukai::GnuGoEngine
        end

      engines[
        "#{name}-#{id}-#{session[:session_id].to_s}"] ||= kla.new(name, id)
    end
  end
end

