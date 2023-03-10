package com.charleshl.server.mainframe.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class SessionService {

    @Value("${login.session.timeoutInS}")
    private long expirationTimeInSecond;

    private Map<String, SessionInfo> sessionMap = new HashMap<>();

    public void addSession(String username, String token) {
        SessionInfo sessionInfo = new SessionInfo(username, LocalDateTime.now(), token);
        sessionMap.put(username, sessionInfo);
    }

    public void updateSession(String username) {
        SessionInfo sessionInfo = sessionMap.get(username);
        sessionInfo.setLastAccess(LocalDateTime.now());
    }

    public void removeSession(String username) {
        sessionMap.remove(username);
    }

    public boolean isSessionExpired(String username, String token) {
        SessionInfo sessionInfo = sessionMap.get(username);
        if (sessionInfo == null) {
            return true;
        }
        LocalDateTime lastAccess = sessionInfo.getLastAccess();
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(lastAccess.plusSeconds(expirationTimeInSecond)) || !sessionInfo.getToken().equals(token);
    }

    /**
     * SessionInfo
     */
    @Data
    static class SessionInfo {

        /**
         * username
         */
        private String username;

        /**
         * lastAccess
         */
        private LocalDateTime lastAccess;

        /**
         * token
         */

        private String token;

        /**
         * Constructor
         * @param username username
         * @param lastAccess lastAccess
         * @param token token
         */
        public SessionInfo(String username, LocalDateTime lastAccess, String token) {
            this.username = username;
            this.lastAccess = lastAccess;
            this.token = token;
        }
    }
}