#!/bin/bash

# Check if target hostname is set
: "${1:?Need to define hostname of the deployment target}"

# Are we deploying to TEST environment
# If so, we run acceptance tests after deployment
: "${2: Need to set argument as TEST to run acceptance testing}"
if [[ $2 = 'TEST' ]] ; then
  echo "Running in TEST environment"
else
  echo "Running in PROD enviroment"
fi

# Make sure that the docker service is running on this computer
echo Start docker on this computer
sudo service docker start

# Exit/fail on all errors
set -e
set -o pipefail

# Shut down running docker containers and ignore errors
echo Shutdown running docker containers on target host
ssh vagrant@$1 'docker kill tictactoe && docker rm tictactoe' || true


# Pull from docker to target server env and run it in docker
if [[ $3 = 0 ]] ; then
  echo Revision not defined, defaulting to latest docker image and start docker on target host
  ssh vagrant@$1 'docker pull fannarlevy/tictactoe && docker run -p 9000:8080 -d --name tictactoe -e "NODE_ENV=production" fannarlevy/tictactoe'
else
  echo Get latests docker image $3 and start docker on target host
  ssh vagrant@$1 'docker pull fannarlevy/tictactoe:'$3' && docker run -p 9000:8080 -d --name tictactoe -e "NODE_ENV=production" fannarlevy/tictactoe:'$3''
fi

# Run acceptance testing if TEST environment
if [[ $2 = 'TEST' ]] ; then
  echo "Running acceptance tests"
  export ACCEPTANCE_URL=http://$1:9000
  grunt mochaTest:acceptance
fi

echo "Done"
