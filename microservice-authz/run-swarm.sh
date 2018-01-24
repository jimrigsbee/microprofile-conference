#!/bin/bash
mvn clean package -Pwildfly -DskipTests wildfly-swarm:run -Dswarm.http.port=5055 -Dswarm.management.http.disable=true
