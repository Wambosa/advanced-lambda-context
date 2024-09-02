.PHONY: install test publish

ROOT_DIR           :=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
OS                 := $(shell uname | tr '[:upper:]' '[:lower:]')

# 
# Common Repositry Activities
# 

install:
	@npm install

test:
	@npm test

publish:
	@npm publish
