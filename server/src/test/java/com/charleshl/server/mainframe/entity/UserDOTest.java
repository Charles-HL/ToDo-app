package com.charleshl.server.mainframe.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class UserDOTest {

    @Test
    public void testGettersAndSetters() {
        UserDO user = new UserDO();
        user.setId(1);
        user.setUsername("testuser");
        user.setPassword("testpass");

        assertEquals(1, user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("testpass", user.getPassword());
    }

    @Test
    public void testConstructor() {
        UserDO user = new UserDO("testuser", "testpass");
        assertEquals("testuser", user.getUsername());
        assertEquals("testpass", user.getPassword());
    }
}
