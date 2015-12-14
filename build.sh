#!/bin/bash

# Make sure that we exit in case of an error
set -e
set -o pipefail

# Install required components
echo Installing required npm and bower components
npm install
bower install

# Build
echo Building app
grunt

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Grunt build failed with exit code " $rc
    exit $rc
fi

echo "Done"
