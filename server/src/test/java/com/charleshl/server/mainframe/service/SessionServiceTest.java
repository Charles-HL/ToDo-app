package com.charleshl.server.mainframe.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SessionServiceTest {

    private SessionService sessionService;

    @BeforeEach
    void setUp() throws NoSuchFieldException, IllegalAccessException {
        sessionService = new SessionService();
        Field expirationTimeInSecond = SessionService.class.getDeclaredField("expirationTimeInSecond");
        expirationTimeInSecond.setAccessible(true);
        expirationTimeInSecond.set(sessionService, 10L);
    }

    @Test
    void testAddSession() throws NoSuchFieldException, IllegalAccessException {
        String username = "testuser";
        String token = "testtoken";
        sessionService.addSession(username, token);
        Field sessionMap = SessionService.class.getDeclaredField("sessionMap");
        sessionMap.setAccessible(true);
        Map map = (Map) sessionMap.get(sessionService);
        assertTrue(map.containsKey(username));
    }

    @Test
    void testUpdateSession() throws NoSuchFieldException, IllegalAccessException, NoSuchMethodException, InvocationTargetException, InterruptedException {
        String username = "testuser";
        String token = "testtoken";
        sessionService.addSession(username, token);
        Field sessionMap = SessionService.class.getDeclaredField("sessionMap");
        sessionMap.setAccessible(true);
        Map map = (Map) sessionMap.get(sessionService);

        Method getLastAccess = SessionService.SessionInfo.class.getDeclaredMethod("getLastAccess");
        getLastAccess.setAccessible(true);
        LocalDateTime oldLastAccess = (LocalDateTime) getLastAccess.invoke(map.get(username));
        // wait for 1 second
        Thread.sleep(1000);
        sessionService.updateSession(username);
        map = (Map) sessionMap.get(sessionService);
        LocalDateTime newLastAccess = (LocalDateTime) getLastAccess.invoke(map.get(username));
        assertTrue(newLastAccess.isAfter(oldLastAccess));
    }

    @Test
    void testRemoveSession() throws NoSuchFieldException, IllegalAccessException {
        String username = "testuser";
        String token = "testtoken";
        sessionService.addSession(username, token);
        sessionService.removeSession(username);
        Field sessionMap = SessionService.class.getDeclaredField("sessionMap");
        sessionMap.setAccessible(true);
        Map map = (Map) sessionMap.get(sessionService);
        assertFalse(map.containsKey(username));
    }

    @Test
    void testIsSessionExpired() throws InterruptedException, NoSuchFieldException, IllegalAccessException {
        Field expirationTimeInSecond = SessionService.class.getDeclaredField("expirationTimeInSecond");
        expirationTimeInSecond.setAccessible(true);
        expirationTimeInSecond.set(sessionService, 1L);
        String username = "testuser";
        String token = "testtoken";
        sessionService.addSession(username, token);
        // wait for 1 second to simulate session expiration
        Thread.sleep(1000);
        assertTrue(sessionService.isSessionExpired(username, token));
    }
}
