
#
# koukai/gnugo.rb

require 'open3'


module Koukai

  class Engine

    attr_reader :name, :id

    def initialize(name, id)

      @name, @id = name, id

      @stdin, @stdout, @stderr, @wait_thread = Open3.popen3(command)
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

  class GnuGoEngine < Engine

    def command

      cmd = ENV['KOUKAI_GNUGO'] || '/usr/local/bin/gnugo'

      "#{cmd} --mode=gtp"
    end
  end
end

