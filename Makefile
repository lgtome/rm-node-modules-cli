publish-ci:
	npm version patch
	npm publish --access public
publish: 
	- npm run patch
	$(MAKE) publish-ci

