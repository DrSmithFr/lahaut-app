APP_DIR := $(abspath $(lastword $(MAKEFILE_LIST)))

build: reload
install: env hooks dependencies start build start database
reload: stop start

dependencies:
	npm install

start:
	ng serve

prod:
	ng build --prod

test:
	ng test
