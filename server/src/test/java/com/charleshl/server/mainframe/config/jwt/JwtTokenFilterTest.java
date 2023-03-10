package com.charleshl.server.mainframe.config.jwt;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.service.SessionService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

public class JwtTokenFilterTest {

    private JwtTokenProvider jwtTokenProvider;
    private SessionService sessionService;
    private JwtTokenFilter jwtTokenFilter;

    @BeforeEach
    public void setUp() {
        jwtTokenProvider = Mockito.mock(JwtTokenProvider.class);
        sessionService = Mockito.mock(SessionService.class);
        jwtTokenFilter = new JwtTokenFilter(jwtTokenProvider, sessionService);
    }

    @Test
    public void testDoFilterInternal() throws ServletException, IOException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);
        Authentication auth = Mockito.mock(Authentication.class);
        UserPrincipal userPrincipal = Mockito.mock(UserPrincipal.class);
        SecurityContextHolder.getContext().setAuthentication(auth);

        Mockito.when(jwtTokenProvider.resolveToken(request)).thenReturn("test_token");
        Mockito.when(jwtTokenProvider.validateToken("test_token")).thenReturn(true);
        Mockito.when(jwtTokenProvider.getAuthentication("test_token")).thenReturn(auth);
        Mockito.when(auth.getPrincipal()).thenReturn(userPrincipal);
        Mockito.when(userPrincipal.getUsername()).thenReturn("test_username");
        Mockito.when(sessionService.isSessionExpired("test_username", "test_token")).thenReturn(false);

        jwtTokenFilter.doFilterInternal(request, response, filterChain);

        Mockito.verify(sessionService, Mockito.times(1)).updateSession("test_username");
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(request, response);
    }
}
