
#
# koukai/gnugo.rb

require 'open3'


module Koukai

  class GnuGo

    def initialize

      gnugo = ENV['KOUKAI_GNUGO'] || '/usr/local/bin/gnugo'

      @stdin, @stdout, @stderr, @wait_thread =
        Open3.popen3("#{gnugo} --mode=gtp")
    end

    def pid

      @wait_thread[:pid]
    end

    def raw_post(data)

      data = IndifferentHash.new(data)
p data
p data['command']

      @stdin.puts(data['command'])

      s = ''; loop do
        s += @stdout.gets
        break s if s.end_with?("\n\n")
      end
    end

    def post(data)

      s = raw_post(data)

      { s: s }
    end

    def close

      @stdin.close
      @stdout.close
      @stderr.close

      @stdin = nil
    end
  end
end

