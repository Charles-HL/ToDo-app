package com.charleshl.server.mainframe.controller;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.config.jwt.JwtTokenProvider;
import com.charleshl.server.mainframe.dto.CreateUserResponseDTO;
import com.charleshl.server.mainframe.dto.LoginDTO;
import com.charleshl.server.mainframe.dto.LoginResponseDTO;
import com.charleshl.server.mainframe.dto.SignupDTO;
import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.service.SessionService;
import com.charleshl.server.mainframe.service.UserService;
import com.charleshl.server.todoapp.entity.TaskDO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private SessionService sessionService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLoginSuccess() {
        // Arrange
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("testuser");
        loginDTO.setPassword("password");

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                new UserPrincipal(new UserDO("testuser", "password")), "password");

        UserPrincipal userPrincipal = new UserPrincipal(new UserDO("testuser", "password"));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(jwtTokenProvider.createToken(any(UserPrincipal.class))).thenReturn("token");

        // Act
        ResponseEntity<LoginResponseDTO> responseEntity = authController.login(loginDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("token", responseEntity.getBody().getToken());
        verify(sessionService).addSession("testuser", "token");
    }

    @Test
    public void testSignupSuccess() {
        // Arrange
        SignupDTO signupDTO = new SignupDTO();
        signupDTO.setUsername("testuser");
        signupDTO.setPassword("password");

        when(userService.getUserByUsername("testuser")).thenReturn(null);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        // Act
        ResponseEntity<CreateUserResponseDTO> responseEntity = authController.signup(signupDTO);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().isSuccess());
        verify(userService).saveUser(argThat(user -> user.getUsername().equals("testuser") &&
                user.getPassword().equals("encodedPassword")));
    }

}