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

    //TODO add two annotations to configure the name of the session count
    // to be displayed in the health check output.  Make the config name
    // the same as the attribute

    private String sessionCountName = "something bogus";

    @Override
    public HealthCheckResponse call() {
        // Return a response named 'sessions-check'
        // Return data:
        // - count of sessions contained in the data store
        // - date the health check occurred as 'lastCheckDate'
        //TODO The application is 'up' is session count > 0 otherwise 'down'
        long sessionCount = sessionStore.getSessions().size();
        HealthCheckResponseBuilder healthCheckResponse = HealthCheckResponse.named("sessions-check")
            .withData(sessionCountName, sessionCount) // note the customizable name
            .withData("lastCheckDate", new Date().toString());

        //TODO change this logic to indicate the service is down if the session count = 0
        return healthCheckResponse.up().build();
    }
}
