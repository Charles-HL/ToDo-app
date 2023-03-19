/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.config.jwt;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.entity.UserDO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

/**
 * This class is used to generate and validate JWT tokens.
 *
 * @author Charles HL
 */
@Service
public class JwtTokenProvider {

    /**
     * The length of the secret key used to sign the JWT token.
     */
    private static final int JWT_SECRET_KEY_LENGTH = 64;

    /**
     * The secret key used to sign the JWT token.
     */
    private String jwtSecret;

    /**
     * This method is used to generate a random secret key.
     */
    @PostConstruct
    public void init() {
        // Generate random jwtSecret
        jwtSecret = generateJwtSecret();
    }

    /**
     * This method is used to generate a random secret key.
     *
     * @return A random secret key.
     */
    static String generateJwtSecret() {
        SecureRandom random = new SecureRandom();
        byte[] secretBytes = new byte[JWT_SECRET_KEY_LENGTH];
        random.nextBytes(secretBytes);
        return Base64.getEncoder().encodeToString(secretBytes);
    }

    /**
     * This method is used to create a JWT token.
     *
     * @param userPrincipal The user principal.
     * @return The JWT token.
     */
    public String createToken(UserPrincipal userPrincipal) {
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    /**
     * This method is used to resolve the JWT token from the HTTP request.
     *
     * @param request The HTTP request.
     * @return The JWT token.
     */
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * This method is used to validate the JWT token.
     *
     * @param token The JWT token.
     * @return True if the JWT token is valid, false otherwise.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * This method is used to get the authentication from the JWT token.
     *
     * @param token The JWT token.
     * @return The authentication.
     */
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = getUserDetailsFromToken(token);
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    /**
     * This method is used to get the user details from the JWT token.
     *
     * @param token The JWT token.
     * @return The user details.
     */
    private UserDetails getUserDetailsFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        String username = claims.getSubject();
        return new UserPrincipal(new UserDO(username, null));
    }

}
