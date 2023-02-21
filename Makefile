APP_DIR := $(abspath $(lastword $(MAKEFILE_LIST)))

.PHONY: hooks

build: dependencies prod
install: nvm hooks dependencies start

nvm:
	. ${NVM_DIR}/nvm.sh && nvm install $(cat .nvmrc)

dependencies: nvm
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && npm install

start: nvm
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng serve

prod: nvm
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng build --prod

test: nvm
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc) && ng test

hooks:
	chmod +x hooks/pre-commit.sh
	chmod +x hooks/pre-push.sh
	rm -f .git/hooks/pre-commit
	rm -f .git/hooks/pre-push
	ln -s -f ../../hooks/pre-commit.sh .git/hooks/pre-commit
	ln -s -f ../../hooks/pre-push.sh .git/hooks/pre-push
