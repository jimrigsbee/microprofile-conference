/*
 * Copyright (c) 2016 IBM, and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.microprofile.showcase.vote.persistence.couch;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.faulttolerance.Asynchronous;
import org.eclipse.microprofile.faulttolerance.Bulkhead;
import org.eclipse.microprofile.faulttolerance.CircuitBreaker;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;
import org.eclipse.microprofile.faulttolerance.exceptions.CircuitBreakerOpenException;
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.HealthCheckResponseBuilder;

import io.microprofile.showcase.vote.model.SessionRating;
import io.microprofile.showcase.vote.persistence.Persistent;
import io.microprofile.showcase.vote.persistence.SessionRatingDAO;
import io.microprofile.showcase.vote.persistence.couch.CouchConnection.RequestType;

import org.eclipse.microprofile.metrics.annotation.Timed;

@ApplicationScoped
@Persistent
// Default time out is 1 second
@Timeout(1000)
// Implement a health check
@Health
public class CouchSessionRatingDAO implements SessionRatingDAO, HealthCheck {

    @Inject
    CouchConnection couch;

    private String allView = "function (doc) {emit(doc._id, 1)}";

    private String sessionView = "function (doc) {emit(doc.session, doc._id)}";
    private String attendeeView = "function (doc) {emit(doc.attendeeId, doc._id)}";

    private String designDoc = "{\"views\":{"
                               + "\"all\":{\"map\":\"" + allView + "\"},"
                               + "\"session\":{\"map\":\"" + sessionView + "\"},"
                               + "\"attendee\":{\"map\":\"" + attendeeView + "\"}}}";

    private boolean connected;

    @PostConstruct
    public void connect() {
        this.connected = couch.connect("ratings");

        if (this.connected) {
            String design = couch.request("_design/ratings", RequestType.GET, null, String.class, null, 200, true);
            if (design == null) {
                couch.request("_design/ratings", RequestType.PUT, designDoc, null, null, 201);
            }
        }
    }

    @Override
    public SessionRating rateSession(SessionRating sessionRating) {

        CouchID ratingID = couch.request(null, RequestType.POST, sessionRating, CouchID.class, null, 201);
        sessionRating = getSessionRating(ratingID.getId());

        return sessionRating;

    }

    private SessionRating getSessionRating(String id) {
        SessionRating sessionRating = couch.request(id, RequestType.GET, null, SessionRating.class, null, 200);
        return sessionRating;
    }

    @Override
    public SessionRating updateRating(SessionRating newRating) {
        /*SessionRating original = */ getSessionRating(newRating.getId());

        couch.request(newRating.getId(), RequestType.PUT, newRating, null, null, 201);
        return getSessionRating(newRating.getId());
    }

    @Override
    public void deleteRating(String id) {

        /*SessionRating original = */ getSessionRating(id);

        couch.request(id, RequestType.DELETE, null, null, null, 200);
    }

    @Override
    public SessionRating getRating(String id) {
        SessionRating sessionRating = couch.request(id, RequestType.GET, null, SessionRating.class, null, 200, true);
        return sessionRating;
    }

    // invoke async and limit concurrent invocations to 3
    @Asynchronous
    @Bulkhead(3)
    private Future<SessionRating> getRatingAsync(String id) {
    	return CompletableFuture.completedFuture(getRating(id));
    }

    @Override
    public Collection<SessionRating> getRatingsBySession(String sessionId) {
        return querySessionRating("session", sessionId);
    }

    @Override
    public Collection<SessionRating> getRatingsByAttendee(String attendeeId) {
        return querySessionRating("attendee", attendeeId);
    }

    // Retry once when any exception is thrown
    @Retry(maxRetries = 1, retryOn=Exception.class)
    private Collection<SessionRating> querySessionRating(String query, String value) {

        AllDocs allDocs = couch.request("_design/ratings/_view/" + query, "key", "\"" + value + "\"", RequestType.GET, null, AllDocs.class, null, 200);

        // Request a future for each Attendee
        List<Future<SessionRating>> futureRatings = new ArrayList<>();
        allDocs.getIds().forEach(id -> futureRatings.add(getRatingAsync(id)));

        // Once all requests have been made, block for results to build list
        Collection<SessionRating> ratings = new ArrayList<>();
        futureRatings.forEach(futureRating -> {
			try {
				ratings.add(futureRating.get());
			} catch (InterruptedException | ExecutionException ignore) {
			}
		});

        return ratings;
    }



    @Override
    // Retry up to 5 times with a 3 second delay in between tries
    @Retry(maxRetries = 5, delay=3000, delayUnit=ChronoUnit.MILLIS)
    // Fallback to sending an empty session ratings collection
    @Fallback(CouchSessionFallbackHandler.class)
    // Open circuit when the failure ratio is 75%, keep the circuit open for 1 second
    // close the circuit when we get 10 successful invocations
    // rolling window of consecutive invocations is 4
    @CircuitBreaker(successThreshold = 10, requestVolumeThreshold = 4, failureRatio=0.75, delay = 1000)
    public Collection<SessionRating> getAllRatings() {

        AllDocs allDocs = couch.request("_design/ratings/_view/all", RequestType.GET, null, AllDocs.class, null, 200);

        Collection<SessionRating> sessionRatings = new ArrayList<SessionRating>();
        for (String id : allDocs.getIds()) {
            SessionRating sessionRating = getSessionRating(id);
            sessionRatings.add(sessionRating);
        }

        return sessionRatings;
    }

    @Override
    // Time out after 5 seconds
    @Timeout(5000)
    public void clearAllRatings() {
        AllDocs allDocs = couch.request("_design/ratings/_view/all", RequestType.GET, null, AllDocs.class, null, 200);

        for (String id : allDocs.getIds()) {
            deleteSessionRating(id);
        }

    }

    private void deleteSessionRating(String id) {
        /*SessionRating sessionRating = */ getSessionRating(id);

        couch.request(id, RequestType.DELETE, null, null, null, 200);
    }

	@Override
	public HealthCheckResponse call() {
    // return 'up' if we are connected to CouchDB, 'down' otherwise
		HealthCheckResponseBuilder b = HealthCheckResponse.named(CouchSessionRatingDAO.class.getSimpleName());
		return connected  ? b.up().build()  : b.down().build();
	}
}
