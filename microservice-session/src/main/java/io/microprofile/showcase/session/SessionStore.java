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

package io.microprofile.showcase.session;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import io.microprofile.showcase.bootstrap.BootstrapData;
import io.microprofile.showcase.bootstrap.SessionFactory;

/**
 * @author Heiko Braun
 * @since 16/09/16
 */
//TODO Scope this bean so there is only one for the application
public class SessionStore {

    //TODO Avoid a null pointer exception here!!!
    BootstrapData bootstrapData;

    // Get the desired state of loading default data
    // Use MP 1.2 configuration
    //TODO add two annotations here, make injection name the same as the attribute name
    private Boolean loadSampleData = true;

    private final ConcurrentHashMap<String, Session> storage = new ConcurrentHashMap<>();

    public Session save(final Session session) {
        session.setId(UUID.randomUUID().toString());
        storage.put(session.getId(), session);
        return session;
    }

    //TODO Make sure this gets called once when the bean is created
    private void initStore() {
      if (loadSampleData) {
        Logger.getLogger(SessionStore.class.getName()).log(Level.INFO, "Initialise sessions from bootstrap data");

        //TODO notice the cool Java 8 lamda below
        bootstrapData.getSessions()
            .forEach(bootstrap -> storage.put(bootstrap.getId(), SessionFactory.fromBootstrap(bootstrap)));
      } else {
        Logger.getLogger(SessionStore.class.getName()).log(Level.WARNING, "Bypassed loading from bootstrap data");
      }
    }

    public Collection<Session> getSessions() {
        return storage.values();
    }

    public Optional<Session> find(final String sessionId) {
        final Session result = storage.get(sessionId);
        return result!=null ? Optional.of(result) : Optional.empty();
    }

    public Optional<Session> update(final String sessionId, final Session session) {
        final Optional<Session> existing = find(sessionId);
        if(existing.isPresent()) {
            session.setId(sessionId);
            storage.put(sessionId, session);
        }
        return existing;
    }

    public Optional<Session> remove(final String sessionId) {
        final Optional<Session> existing = find(sessionId);
        if(existing.isPresent()) {
            storage.remove(existing.get().getId());
        }
        return existing;
    }
}
