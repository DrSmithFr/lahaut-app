#!/bin/bash

# loading all hooks helper
source ./hooks/bin/ask.sh
source ./hooks/bin/display.sh
source ./hooks/bin/git.sh

# switching to project node version
. ${NVM_DIR}/nvm.sh && nvm use $(cat .nvmrc)

# get all modified files array
FILES=$(git_modified_files $(git_current_commit))


display title "Checking files for merge conflicts"
./hooks/src/check-merge-tags.sh ${FILES}
if [[ $? -ne 0 ]]
then
  display error "Your code need to be checked (Merge tags found)"
  exit 1
fi

display title "Checking files for forgotten console.log()"
./hooks/src/check-console-log.sh ${FILES}
if [[ $? -ne 0 ]]
then
  display error "Your code need to be checked (Console.log found)"
  exit 1
fi

display title "Checking EsLint"
ng lint
if [[ $? -ne 0 ]]
then
  display error "Your code need to be checked (EsLint Syntax errors)"
  exit 1
fi

display title "Running ng test"
ng test --no-watch
UNITTEST=$?
if [[ ${UNITTEST} -ne 0 ]]
then
  display error "Your code need to be checked (ng test failed with code ${UNITTEST})"
  exit 1
fi

# Post checkup validation
echo ""
display title "Affected files validation"
./hooks/src/ask-validation.sh ${FILES}
exit $?
