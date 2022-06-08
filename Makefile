publish:
	npm run version:output
	- git add . && git commit -m "patched: $v"