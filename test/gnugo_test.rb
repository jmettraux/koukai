
#
# test/gnugo_test.rb

group 'koukai :: gnugo' do

  after do

    @g.close rescue nil
  end

  test '.new' do

    @g = Koukai::GnuGo.new

    assert @g.pid > 0

    r = @g.raw_post(command: 'boardsize 9')

    assert_equal r.strip, '='

    r = @g.raw_post(command: 'showboard')

    assert_match r, /WHITE \(O\) has captured 0 stones/
  end
end

