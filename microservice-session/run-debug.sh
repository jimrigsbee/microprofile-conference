#!/bin/sh
mvn wildfly-swarm:run -Dswarm.http.port=5050 -Dswarm.management.http.disable=true -Dswarm.debug.port=50509
