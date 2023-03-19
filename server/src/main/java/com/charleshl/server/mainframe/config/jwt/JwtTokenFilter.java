/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.config.jwt;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.service.SessionService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * This filter is used to validate the token in the request header
 *
 * @author Charles HL
 */
public class JwtTokenFilter extends OncePerRequestFilter {


    /**
     * The SessionService is used to update the session
     */
    private final SessionService sessionService;

    /**
     * The JwtTokenProvider is used to validate the token
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * The constructor of JwtTokenFilter
     *
     * @param jwtTokenProvider The JwtTokenProvider
     * @param sessionService   The SessionService
     */
    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider, SessionService sessionService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.sessionService = sessionService;
    }

    /**
     * This method is used to validate the token in the request header
     *
     * @param request     The HttpServletRequest
     * @param response    The HttpServletResponse
     * @param filterChain The FilterChain
     * @throws ServletException The ServletException
     * @throws IOException      The IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // Get the token from the request
        String token = jwtTokenProvider.resolveToken(request);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication auth = jwtTokenProvider.getAuthentication(token);
            String username = ((UserPrincipal) auth.getPrincipal()).getUsername();
            if (!sessionService.isSessionExpired(username, token)) {
                sessionService.updateSession(username);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(request, response);
    }
}
