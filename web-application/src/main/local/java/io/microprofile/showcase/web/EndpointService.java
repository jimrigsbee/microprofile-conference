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
package io.microprofile.showcase.web;


import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.stream.Collectors;

import javax.enterprise.context.ApplicationScoped;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

@Path("/endpoints")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
public class EndpointService {

    private final Map<String, Endpoints> map = new HashMap<>(1);

    @Context
    private ServletContext context;

    @Context
    private UriInfo uriInfo;

    /**
     * Allows the cached Endpoints to be reset, forcing a config reload
     *
     * @return Message
     */
    @GET
    public String reset() {
        this.map.clear();
        return "Reset endpoints";
    }

    /**
     * Get the named application endpoints.
     *
     * @return Endpoints
     */
    @GET
    @Path("/list")
    public Endpoints getEndpoints() {
    	
    		String application = System.getenv("ENDPOINT_NAME");
    		if (application == null || "".equals(application))
    			application = "conference";

        return this.getCachedEndpoints(application);
    }

    private Endpoints getCachedEndpoints(final String application) throws WebApplicationException {


        Endpoints eps = this.map.get(application);

        if (null == eps) {

            final Properties p = new Properties();

            try (final InputStream is = this.context.getResourceAsStream("/WEB-INF/" + application + ".properties")) {
                p.load(is);
            } catch (final Exception e) {
                throw new WebApplicationException("Unexpected error", e);
            }

            final Set<Endpoint> endpointSet = p.entrySet().stream()
                    .map(entry -> this.getEndpoint(String.class.cast(entry.getKey()), String.class.cast(entry.getValue()))).collect(Collectors.toSet());

            eps = new Endpoints();

            eps.setApplication(application);
            eps.setEndpoints(endpointSet);

            eps = this.addHyperMedia(eps);
            this.map.put(application, eps);
        }

        return eps;
    }

    private Endpoint getEndpoint(final String name, final String val) {
        final Endpoint ep = new Endpoint();
        ep.setName(name);
        ep.setUrl(val);
        System.out.printf("Endpoint(%s, %s)\n", name, val);
        return ep;
    }

    private Endpoints addHyperMedia(final Endpoints eps) {

        if (null != eps) {

            if (null != eps.getApplication()) {
                eps.getLinks().put("self", this.uriInfo.getBaseUriBuilder().path(EndpointService.class).build(eps.getApplication()));
            }
        }

        return eps;
    }

}
