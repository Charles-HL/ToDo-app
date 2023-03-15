package com.charleshl.server.mainframe.config;

import com.charleshl.server.mainframe.config.jwt.JwtTokenProvider;
import com.charleshl.server.mainframe.service.MyUserDetailsService;
import com.charleshl.server.mainframe.service.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class SecurityConfigTest {

    @Mock
    private MyUserDetailsService userDetailsService;

    @Mock
    private SessionService sessionService;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        securityConfig = new SecurityConfig(jwtTokenProvider, sessionService);
    }

    @Test
    void testAuthenticationManager() throws Exception {
        AuthenticationConfiguration configuration = mock(AuthenticationConfiguration.class);
        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
        // Return the mock AuthenticationManager when calling configuration.getAuthenticationManager()
        Mockito.when(configuration.getAuthenticationManager()).thenReturn(authenticationManager);
        securityConfig.authenticationManager(configuration);
        // Verify that configuration.getAuthenticationManager() is called
        verify(configuration).getAuthenticationManager();
    }

    @Test
    void testPasswordEncoder() {
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        // Verify that the passwordEncoder is not null
        assert(passwordEncoder != null);
    }

}
