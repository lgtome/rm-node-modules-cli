publish-ci:
	npm publish --access public
publish: 
	- npm run patch
	$(MAKE) publish-ci

