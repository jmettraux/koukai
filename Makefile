
serve:
	bundle exec rackup -p 1919 -o 0.0.0.0 -s puma lib/rackup.ru
s: serve

.PHONY: \
  serve

