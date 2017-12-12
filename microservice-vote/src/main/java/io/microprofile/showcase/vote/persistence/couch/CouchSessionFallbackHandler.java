package io.microprofile.showcase.vote.persistence.couch;

import java.util.ArrayList;
import java.util.Collection;

import org.eclipse.microprofile.faulttolerance.ExecutionContext;
import org.eclipse.microprofile.faulttolerance.FallbackHandler;

import io.microprofile.showcase.vote.model.SessionRating;

public class CouchSessionFallbackHandler implements FallbackHandler<Collection<SessionRating>>{

	@Override
	public Collection<SessionRating> handle(ExecutionContext context) {
	   	Collection<SessionRating> ratings = new ArrayList<>();
	   	return ratings;
	}

}
