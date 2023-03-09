package com.charleshl.server.mainframe.config.jwt;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.entity.UserDO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

/**
 * This class is used to test the {@link JwtTokenProvider} class.
 *
 * @author Charles HL
 */
class JwtTokenProviderTest {

    /**
     * The JwtTokenProvider instance to be tested.
     */
    private JwtTokenProvider jwtTokenProvider;

    /**
     * The HttpServletRequest instance to be mocked.
     */
    @Mock
    private HttpServletRequest httpServletRequest;

    /**
     * This method is used to initialize the JwtTokenProvider instance and the HttpServletRequest instance.
     */
    @BeforeEach
    void setUp() throws NoSuchFieldException, NoSuchMethodException {
        jwtTokenProvider = new JwtTokenProvider();
        MockitoAnnotations.openMocks(this);
        jwtTokenProvider.init();
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#generateJwtSecret()} method.
     */
    @Test
    void generateJwtSecret_generatesRandomSecretKey() {
        String secret1 = JwtTokenProvider.generateJwtSecret();
        String secret2 = JwtTokenProvider.generateJwtSecret();
        assertNotNull(secret1);
        assertNotNull(secret2);
        assertNotEquals(secret1, secret2);
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#createToken(UserPrincipal)} method.
     */
    @Test
    void createToken_createsValidJwtToken() throws NoSuchFieldException, IllegalAccessException {
        UserPrincipal userPrincipal = new UserPrincipal(new UserDO("testuser", "testpassword"));
        String token = jwtTokenProvider.createToken(userPrincipal);
        assertNotNull(token);
        Field jwtSecretField = JwtTokenProvider.class.getDeclaredField("jwtSecret");
        jwtSecretField.setAccessible(true);
        Claims claims = Jwts.parser().setSigningKey((String) jwtSecretField.get(jwtTokenProvider)).parseClaimsJws(token).getBody();
        assertEquals(userPrincipal.getUsername(), claims.getSubject());
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#resolveToken(HttpServletRequest)} method.
     */
    @Test
    void resolveToken_returnsTokenFromAuthorizationHeader() {
        String token = "testtoken";
        when(httpServletRequest.getHeader("Authorization")).thenReturn("Bearer " + token);
        assertEquals(token, jwtTokenProvider.resolveToken(httpServletRequest));
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#resolveToken(HttpServletRequest)} method.
     */
    @Test
    void resolveToken_returnsNullWhenAuthorizationHeaderIsMissing() {
        when(httpServletRequest.getHeader("Authorization")).thenReturn(null);
        assertNull(jwtTokenProvider.resolveToken(httpServletRequest));
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#validateToken(String)} method.
     */
    @Test
    void validateToken_returnsTrueForValidJwtToken() {
        UserPrincipal userPrincipal = new UserPrincipal(new UserDO("testuser", "testpassword"));
        String token = jwtTokenProvider.createToken(userPrincipal);
        assertTrue(jwtTokenProvider.validateToken(token));
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#validateToken(String)} method.
     */
    @Test
    void validateToken_returnsFalseForInvalidJwtToken() {
        assertFalse(jwtTokenProvider.validateToken("invalidtoken"));
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#getAuthentication(String)} method.
     */
    @Test
    void getAuthentication_returnsUsernamePasswordAuthenticationToken() {
        UserPrincipal userPrincipal = new UserPrincipal(new UserDO("testuser", "testpassword"));
        String token = jwtTokenProvider.createToken(userPrincipal);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        assertNotNull(authentication);
        assertTrue(authentication instanceof UsernamePasswordAuthenticationToken);
    }

    /**
     * This method is used to test the {@link JwtTokenProvider#getUserDetailsFromToken(String)} method.
     */
    @Test
    void getUserDetailsFromToken_returnsUserDetails() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        UserPrincipal userPrincipal = new UserPrincipal(new UserDO("testuser", "testpassword"));
        String token = jwtTokenProvider.createToken(userPrincipal);
        Method getUserDetailsFromToken = JwtTokenProvider.class.getDeclaredMethod("getUserDetailsFromToken", String.class);
        getUserDetailsFromToken.setAccessible(true);
        UserDetails userDetails = (UserDetails) getUserDetailsFromToken.invoke(jwtTokenProvider, token);
        assertNotNull(userDetails);
        assertEquals(userPrincipal.getUsername(), userDetails.getUsername());
    }
}
