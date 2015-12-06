#!/bin/bash

echo
echo Pushing latest docker version to the test enviroment
echo

# Make sure that the docker service is running on this computers
sudo service docker start

# We assume that the docker image has been built, but not pushed.
# Push to docker from this dev machine
docker login -u fannarlevy
docker push fannarlevy/tictactoe

# shut down running docker containers
ssh vagrant@192.168.33.20 'docker kill $(docker ps -q) && docker rm $(docker ps -a -q)'

# pull from docker to the test env and run it in docker
ssh vagrant@192.168.33.20 'docker pull fannarlevy/tictactoe && docker run -p 9000:8080 -d -e "NODE_ENV=production" fannarlevy/tictactoe'


echo "Done"