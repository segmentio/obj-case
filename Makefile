
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

test:
	@node_modules/.bin/mocha \
		--reporter spec

node_modules: package.json
	@npm install

clean:
	rm -fr build components template.js

test-browser: build
	@open test/index.html

.PHONY: clean test test-browser
