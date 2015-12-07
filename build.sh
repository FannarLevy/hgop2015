#!/bin/bash

# Make sure that we exit in case of an error
set -e
set -o pipefail

# Install required components
npm install
bower install

# Build solution (docker)
./dockerbuild.sh
