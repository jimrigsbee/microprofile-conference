/*
 * Copyright(c) 2017 IBM, Red Hat, and others.
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
package io.microprofile.showcase.tokens;

import java.util.HashMap;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.jwt.Claims;

/**
 */
@Path("authz")
@ApplicationScoped
public class AuthzResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTokenForCredentials(Credentials credentials) throws Exception {
        System.out.printf("Creating token for username: %s\n", credentials.getUsername());
        String username = credentials.getUsername();
        String simpleName = simpleName(username);
        String password = credentials.getPassword();
        String expectedPassword = simpleName+"-secret";
        if(!password.equals(expectedPassword)) {
            System.err.printf("password(%s) != %s\n", password, expectedPassword);
            return Response.status(403).build();
        }

        HashMap<String, Object> claims = new HashMap<>();
        claims.put(Claims.upn.name(), username);
        claims.put(Claims.preferred_username.name(), simpleName);
        String jsonResName = String.format("/%s.json", simpleName);
        String stoken = TokenUtils.generateTokenString(jsonResName, claims);
        System.out.printf("Created token: %s\n", stoken);
        AuthToken token = new AuthToken(credentials.getUsername(), stoken);

        return Response.ok(token).build();
    }

    private String simpleName(String username) {
        String simpleName = username;
        int atIndex = username.indexOf('@');
        if(atIndex >= 0) {
            simpleName = username.substring(0, atIndex);
        }
        return simpleName;
    }

}
