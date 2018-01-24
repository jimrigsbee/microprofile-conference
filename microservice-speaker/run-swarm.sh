#!/bin/bash
mvn clean package -Pwildfly -DskipTests wildfly-swarm:run -Dswarm.http.port=4040 -Dswarm.management.http.disable=true
