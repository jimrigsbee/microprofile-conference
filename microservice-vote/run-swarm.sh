#!/bin/bash
mvn clean package -Pwildfly wildfly-swarm:run -Dswarm.http.port=7070
