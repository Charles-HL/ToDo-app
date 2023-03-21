/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.service;

import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

/**
 * User service
 *
 * @author Charles HL
 */
@Service
public class UserService {

    /**
     * User repository
     */
    private final UserRepository userRepository;

    /**
     * Password encoder
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Init users
     */
    @PostConstruct
    public void init() {
        // username -> hashed password
        Map<String, String> users = new HashMap<>();
        // Load users from file
        try (Scanner scanner = new Scanner(new File("config/users"))) {
            while (scanner.hasNextLine()) {
                String[] parts = scanner.nextLine().split(",");
                String username = parts[0];
                String hashedPassword = parts[1];
                users.put(username, hashedPassword);
            }
        } catch (FileNotFoundException e) {
            throw new IllegalStateException("Failed to load users file", e);
        }

        // loop on user
        for (Map.Entry<String, String> entry : users.entrySet()) {
            String username = entry.getKey();
            String hashedPassword = entry.getValue();
            UserDO user = getUserByUsername(username);
            if (user == null) {
                user = new UserDO(username, hashedPassword);
                userRepository.save(user);
            }
        }
    }

    /**
     * Constructor
     * @param userRepository User repository
     */
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get all users
     * @return All users
     */
    public List<UserDO> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get user by id
     * @param id The id
     * @return The user
     */
    public Optional<UserDO> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Save user
     * @param userDO The user
     * @return The saved user
     */
    public UserDO saveUser(UserDO userDO) {
        return userRepository.save(userDO);
    }

    /**
     * Delete user
     * @param id The id
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Get user by username
     * @param username The username
     * @return The user
     */
    public UserDO getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
