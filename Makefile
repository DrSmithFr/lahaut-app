APP_DIR := $(abspath $(lastword $(MAKEFILE_LIST)))

.PHONY: hooks

build: dependencies prod
install: nvm hooks dependencies start

nvm:
	. ${NVM_DIR}/nvm.sh && nvm install $(cat .nvmrc)

dependencies:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && npm install

start:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng serve --host=0.0.0.0 --port=4200 --disable-host-check

prod:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng build --production

test:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng test

test_headless:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng test --no-watch --browsers=ChromeHeadless --code-coverage

lint:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng lint

hooks:
	chmod +x hooks/pre-commit.sh
	chmod +x hooks/pre-push.sh
	rm -f .git/hooks/pre-commit
	rm -f .git/hooks/pre-push
	ln -s -f ../../hooks/pre-commit.sh .git/hooks/pre-commit
	ln -s -f ../../hooks/pre-push.sh .git/hooks/pre-push
