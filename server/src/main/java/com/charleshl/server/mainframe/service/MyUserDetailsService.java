package com.charleshl.server.mainframe.service;

import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserDO userDO = userService.getUserByUsername(username);
        if (userDO == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(userDO);
    }
}
