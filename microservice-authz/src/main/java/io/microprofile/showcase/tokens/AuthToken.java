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

import com.fasterxml.jackson.annotation.JsonGetter;

/**
 */
public class AuthToken {
    private String username;
    private String id_token;

    public AuthToken(final String username, final String id_token) {
        this.username = username;
        this.id_token = id_token;
    }

    public String getUsername() {
        return username;
    }

    @JsonGetter("id_token")
    public String getToken() {
        return id_token;
    }

    void setToken(final String id) {
        this.id_token = id;
    }

    @Override
    public String toString() {
      String display = "Username: " + this.username + "Token:\n" + this.id_token;
      return display;
    }

}
