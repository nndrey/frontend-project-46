install:
	npm ci --legacy-peer-deps
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
	
	.PHONY: test