/*
 * Copyright(c) 2016-2017 IBM, Red Hat, and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.microprofile.showcase.bootstrap;

import java.io.IOException;
import java.net.URL;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonReaderFactory;
import javax.json.JsonValue;

/**
 * @author Heiko Braun
 * @since 15/09/16
 */
public class Parser {

    private final AtomicInteger id = new AtomicInteger(0);
    private final AtomicInteger speakerId = new AtomicInteger(0);

    public BootstrapData parse(final URL scheduleResource, final URL speakerResource) {
        try {
            final JsonReaderFactory factory = Json.createReaderFactory(null);
            final JsonReader reader = factory.createReader(scheduleResource.openStream());

            final JsonArray items = reader.readArray();

            // parse session objects
            final List<Session> sessions = new LinkedList<>();

            for (final JsonValue item : items) {
                final Session session = new Session((JsonObject) item);
                session.setId(String.valueOf(this.id.incrementAndGet()));
                sessions.add(session);
            }

            // parse and link speakers and schedules
            final List<Speaker> speakers = parseSpeakers(speakerResource);
            final List<Schedule> schedules = new LinkedList<>();

            for (final Session session : sessions) {

                String sessionSpeaker = String.valueOf(session.getUnderlying().getInt("speaker"));

                // speaker
                Optional<Speaker> matchingSpeaker = speakers.stream()
                    .filter(s -> s.getId().equals(sessionSpeaker))
                    .findAny();

                if(!matchingSpeaker.isPresent()) {
                    throw new RuntimeException("Inconsistent data set: No speaker for Id "+ sessionSpeaker);
                }

                session.setSpeakers(Collections.singletonList(matchingSpeaker.get().getId()));

                // schedules
                final JsonObject times = session.getUnderlying();
                final Schedule schedule = new Schedule(times);
                schedule.setId(String.valueOf(this.id.incrementAndGet()));
                schedules.add(schedule);
                schedule.setSessionId(session.getId());

                session.setSchedule(schedule.getId());

            }

            reader.close();

            return new BootstrapData(sessions, speakers, schedules);

        } catch (final IOException e) {
            throw new RuntimeException("Failed to parse 'schedule.json'", e);
        }
    }

    private final List<Speaker> parseSpeakers(URL speakerResource) {
        try {
            // Create JSON reader for speaker.json file
            final JsonReaderFactory factory = Json.createReaderFactory(null);
            final JsonReader reader = factory.createReader(speakerResource.openStream());

            // Read speaker JSON array
            final JsonArray items = reader.readArray();

            // parse speaker objects
            final List<Speaker> speakers = new LinkedList<>();

            for (final JsonValue item : items) {
                final Speaker speaker = new Speaker((JsonObject) item);
                speaker.setId(String.valueOf(this.speakerId.incrementAndGet()));
                speakers.add(speaker);
            }
            reader.close();
            
            return speakers;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse speaker.json");
        }
    }
}
