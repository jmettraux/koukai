
#
# koukai/gnugo.rb

require 'open3'


module Koukai

  class GnuGo

    def initialize

      cmd =
        ENV['KOUKAI_GNUGO'] || '/usr/local/bin/gnugo'

      @stdin, @stdout, @stderr, @wait_thread =
        Open3.popen3("#{cmd} --mode=gtp")
    end

    def pid

      @wait_thread[:pid]
    end

    def raw_post(data)

      @stdin.puts(data['command'])

      s = ''; loop do
        s += @stdout.gets
        break s if s.end_with?("\n\n")
      end
    end

    def post(data)

      o = raw_post(data)
      s = (o[0, 1] == '=') ? :success : :failure

      { o: o, s: s, c: data['command'] }
    end

    def close

      @stdin.close
      @stdout.close
      @stderr.close

      @stdin = nil
    end
  end
end

