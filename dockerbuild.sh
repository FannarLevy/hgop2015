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

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t fannarlevy/tictactoe .

echo "Done"
