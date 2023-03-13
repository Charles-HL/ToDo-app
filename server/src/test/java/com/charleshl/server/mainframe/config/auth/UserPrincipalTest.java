package com.charleshl.server.mainframe.config.auth;

import com.charleshl.server.mainframe.entity.UserDO;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserPrincipalTest {

    @Test
    public void testUserPrincipal() {
        UserDO userDO = new UserDO();
        userDO.setUsername("johndoe");
        userDO.setPassword("password");
        UserPrincipal userPrincipal = new UserPrincipal(userDO);

        assertEquals("johndoe", userPrincipal.getUsername());
        assertEquals("password", userPrincipal.getPassword());
        assertTrue(userPrincipal.isAccountNonExpired());
        assertTrue(userPrincipal.isAccountNonLocked());
        assertTrue(userPrincipal.isCredentialsNonExpired());
        assertTrue(userPrincipal.isEnabled());

        assertEquals(Collections.emptyList(), userPrincipal.getAuthorities());
    }
}
