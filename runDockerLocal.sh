#!/bin/bash

echo kill running docker instances
docker kill $(docker ps -q)

echo remove dockers instances
docker rm $(docker ps -a -q)

echo download newest docker tictactoe instance
docker pull fannarlevy/tictactoe

echo run the docker container
docker run -p 9000:8080 -d -e "NODE_ENV=production" fannarlevy/tictactoe

