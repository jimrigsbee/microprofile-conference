#!/bin/bash
mvn clean package -Pwildfly wildfly-swarm:run -Dswarm.http.port=5050 -Dswarm.management.http.disable=true
