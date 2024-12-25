install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest --coverage
test-coverage:
	npm test -- --coverage --coverageProvider=v8