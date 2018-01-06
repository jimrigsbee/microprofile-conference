#!/bin/sh
/usr/bin/java -jar target/microservice-authz-swarm.jar -Dswarm.http.port=5055 -Dswarm.management.http.disable=true $@
