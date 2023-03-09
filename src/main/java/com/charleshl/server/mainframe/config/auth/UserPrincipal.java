package com.charleshl.server.mainframe.config.auth;

import java.util.Collection;

import com.charleshl.server.mainframe.entity.UserDO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * This class is used to wrap the UserDO object and implement the UserDetails interface.
 * The UserDetails interface is used by Spring Security to authenticate and authorize users.
 *
 * @author Charles HL
 */
public class UserPrincipal implements UserDetails {

    /*
     * The UserDO
     */
    private UserDO userDO;

    /**
     * Constructor
     *
     * @param userDO
     */
    public UserPrincipal(UserDO userDO) {
        this.userDO = userDO;
    }

    /**
     * Get authorities granted to the user
     *
     * @return authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Implement method to return the authorities granted to the user (e.g. ROLE_USER, ROLE_ADMIN)
        return null;
    }

    /**
     * Get the password of the user
     *
     * @return password
     */
    @Override
    public String getPassword() {
        return userDO.getPassword();
    }

    /**
     * Get the username of the user
     *
     * @return username
     */
    @Override
    public String getUsername() {
        return userDO.getUsername();
    }

    /**
     * Check if the account is not expired
     *
     * @return true if the account is not expired
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Check if the account is not locked
     *
     * @return true if the account is not locked
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Check if the credentials are not expired
     *
     * @return true if the credentials are not expired
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Check if the account is enabled
     *
     * @return true if the account is enabled
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}

