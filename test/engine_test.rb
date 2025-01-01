
#
# test/gnugo_test.rb

group 'Koukai :: GnuGoEngine' do

  after do

    @g.close rescue nil
  end

  test '.new' do

    @g = Koukai::GnuGoEngine.new('gnugo', 0)

    assert @g.pid > 0

    r = @g.raw_post('command' => 'boardsize 9')

    assert_equal r.strip, '='

    r = @g.raw_post('command' => 'showboard')

    assert_match r, /WHITE \(O\) has captured 0 stones/
  end
end

