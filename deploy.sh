#!/bin/bash

echo
echo Pushing latest docker version to the test enviroment
echo

# Make sure that the docker service is running on this computers
echo Start docker on this computer
sudo service docker start

# Exit/fail on all erros
set -e
set -o pipefail

# We assume that the docker image has been built, but not pushed.
# Push to docker from this dev machine
echo Push docker image to dockerhub
docker login -u fannarlevy
docker push fannarlevy/tictactoe

# shut down running docker containers
echo shutdown runnig docker containers on target host
ssh vagrant@192.168.33.20 'docker kill $(docker ps -q) && docker rm $(docker ps -a -q)'

# pull from docker to the test env and run it in docker
echo get latest docker image and start docker on target host
ssh vagrant@192.168.33.20 'docker pull fannarlevy/tictactoe && docker run -p 9000:8080 -d -e "NODE_ENV=production" fannarlevy/tictactoe'


echo "Done"
