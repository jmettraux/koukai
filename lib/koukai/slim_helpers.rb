
#
# koukai/slim_helpers

module Koukai

  module SlimHelpers

    def static_path(pattern)

      File.join(
        Dir[File.join('public', '**', pattern)].first
          .split(File::SEPARATOR)[1..-1])
    end
  end
end

