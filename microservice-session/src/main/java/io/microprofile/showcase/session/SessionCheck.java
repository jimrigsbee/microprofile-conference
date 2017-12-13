package io.microprofile.showcase.session;

import java.util.Date;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.HealthCheckResponseBuilder;

/**
 * Illustration of new MP-1.2 health check for the session application
 */
@Health
@ApplicationScoped
public class SessionCheck implements HealthCheck {
    @Inject
    private SessionStore sessionStore;

    // Get the name for the session count health data from configuration
    // Use MP 1.2 configuration
    @Inject
    @ConfigProperty(name = "sessionCountName", defaultValue = "sessionCount")
    private String sessionCountName;

    @Override
    public HealthCheckResponse call() {
        // Return a response named 'sessions-check'
        // Return data:
        // - count of sessions contained in the data store
        // - date the health check occurred as 'lastCheckDate'
        // The application is 'up' is session count > 0 otherwise 'down'
        long sessionCount = sessionStore.getSessions().size();
        HealthCheckResponseBuilder healthCheckResponse = HealthCheckResponse.named("sessions-check")
            .withData(sessionCountName, sessionCount)
            .withData("lastCheckDate", new Date().toString());


        return (sessionCount > 0) ? healthCheckResponse.up().build()
          : healthCheckResponse.down().build();
    }
}
