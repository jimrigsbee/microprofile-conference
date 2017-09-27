package io.microprofile.showcase.session;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;

/**
 * The health check for the session application
 */
@Health
@ApplicationScoped
public class SessionCheck implements HealthCheck {
    @Inject
    private SessionStore sessionStore;
    @Inject
    @ConfigProperty(name = "sessionCountName", defaultValue = "sessionCount")
    private String sessionCountName;

    @Override
    public HealthCheckResponse call() {
        return HealthCheckResponse.named("sessions-check")
            .withData(sessionCountName, sessionStore.getSessions().size())
            .up()
            .build();
    }
}
