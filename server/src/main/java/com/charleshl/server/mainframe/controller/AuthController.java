package com.charleshl.server.mainframe.controller;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.config.jwt.JwtTokenProvider;
import com.charleshl.server.mainframe.dto.*;
import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.service.SessionService;
import com.charleshl.server.mainframe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth controller class
 *
 * @author Charles HL
 */
@RestController
public class AuthController {

    /**
     * Authentication manager
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * User repository
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Password encoder
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * JWT token provider
     */
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * Session service
     */
    @Autowired
    private SessionService sessionService;


    /**
     * Login method
     * @param loginDTO login DTO
     * @return login response DTO
     */
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponseDTO> login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getUsername(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.createToken((UserPrincipal) authentication.getPrincipal());
        sessionService.addSession(loginDTO.getUsername(), token);
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setToken(token);
        return new ResponseEntity<>(loginResponseDTO, HttpStatus.OK);
    }


    @PostMapping("/signup")
    public ResponseEntity<CreateUserResponseDTO> signup(SignupDTO signupDTO) {
        CreateUserResponseDTO createUserResponseDTO = new CreateUserResponseDTO();
        // Check if username and password not null and not empty
        if (signupDTO.getUsername() == null || signupDTO.getUsername().isEmpty() ||
                signupDTO.getPassword() == null || signupDTO.getPassword().isEmpty()) {
            createUserResponseDTO.setSuccess(false);
            createUserResponseDTO.setMessage("Username or password cannot be empty");
            return new ResponseEntity<>(createUserResponseDTO, HttpStatus.OK);
        }
        // Check if user already exists
        if (userRepository.findByUsername(signupDTO.getUsername()) != null) {
            createUserResponseDTO.setSuccess(false);
            createUserResponseDTO.setMessage("User already exists");
            return new ResponseEntity<>(createUserResponseDTO, HttpStatus.OK);
        }
        // Create new user
        UserDO userDO = new UserDO();
        userDO.setUsername(signupDTO.getUsername());
        userDO.setPassword(passwordEncoder.encode(signupDTO.getPassword()));
        userRepository.save(userDO);
        createUserResponseDTO.setSuccess(true);
        createUserResponseDTO.setMessage("User created successfully");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Logout method
     * @param logoutDTO logout DTO
     * @return ResponseEntity
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(LogoutDTO logoutDTO) {
        // Check if the authenticated user is the same as the user to logout
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.getName().equals(logoutDTO.getUsername())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        sessionService.removeSession(logoutDTO.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Keep alive method
     * @return ResponseEntity
     */
    @PostMapping("/keep-alive")
    public ResponseEntity<Void> postKeepAlive() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
