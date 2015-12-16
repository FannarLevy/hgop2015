#!/bin/bash

# Make sure that we exit in case of an error
set -e
set -o pipefail

# Install required components
echo Installing required npm and bower components
npm install
bower install

# Create docker image
echo create a docker image
./dockerbuild.sh

echo "Done"
