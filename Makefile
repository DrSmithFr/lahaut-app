APP_DIR := $(abspath $(lastword $(MAKEFILE_LIST)))

build: nvm prod

nvm:
	. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc)

dependencies: nvm
	npm install

start: nvm
	ng serve

prod: nvm
	ng build --prod

test: nvm
	ng test
