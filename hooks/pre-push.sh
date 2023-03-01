#!/bin/bash

# loading all hooks helper
source ./hooks/bin/display.sh

# switching to project node version
. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc)

display title "Running ng test"
ng test --no-watch --browsers=ChromeHeadless --code-coverage
UNITTEST=$?
if [[ ${UNITTEST} -ne 0 ]]
then
  display error "Your code need to be checked (ng test failed with code ${UNITTEST})"
  exit 1
fi
