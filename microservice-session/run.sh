#!/bin/sh
#/usr/bin/java -jar target/microservice-session-swarm.jar -Dswarm.http.port=5050 -Dswarm.management.http.disable=true -Dswarm.debug.port=50509
mvn wildfly-swarm:run -Dswarm.http.port=5050 -Dswarm.management.http.disable=true -Dswarm.debug.port=50509
