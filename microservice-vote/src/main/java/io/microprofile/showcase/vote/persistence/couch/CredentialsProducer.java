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

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;

@SuppressWarnings("cdi-ambiguous-dependency")
@ApplicationScoped
public class CredentialsProducer {

  	@Inject
  	@ConfigProperty(name="COUCH_SERVICE", defaultValue="http://localhost:5984/")
    protected String resourceUrl;

	  @Inject
    @ConfigProperty(name="COUCH_USERNAME", defaultValue="admin")
    protected String resourceUsername;

	  @Inject
    @ConfigProperty(name="COUCH_PASSWORD", defaultValue="redhat123")
    protected String resourcePassword;

    @Produces
    public Credentials newCredentials() {
    	System.out.print("Injected: URL: "+ resourceUrl + " USERNAME: " + resourceUsername + " PASSWORD: "+ resourcePassword);
        Credentials credentials = new Credentials(resourceUsername, resourcePassword, resourceUrl);

        return credentials;
    }
}
