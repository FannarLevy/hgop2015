#!/bin/bash

# Configure error handling to exit on any non-zero values
# See SO thread for further info
# http://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
set -e
set -o pipefail

echo Cleaning...
rm -rf ./dist

echo Building app
grunt

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Grunt build failed with exit code " $rc
    exit $rc
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
rc=$?
if [[ $rc != 0 ]] ; then
    echo "NPM install failed with exit code " $rc
    exit $rc
fi

echo Building docker image
docker build -t fannarlevy/tictactoe .

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

echo "Done"
