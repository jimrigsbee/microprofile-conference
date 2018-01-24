#!/bin/bash
mvn clean package -Pwildfly -DskipTests wildfly-swarm:run -Dswarm.http.port=6060 -Dswarm.management.http.disable=true
