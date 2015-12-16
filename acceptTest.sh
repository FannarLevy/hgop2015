#!/bin/bash

echo Restart docker instances
docker restart $(docker ps -q)

echo Running acceptance tests
export ACCEPTANCE_URL=http://localhost:9000
grunt mochaTest:acceptance


