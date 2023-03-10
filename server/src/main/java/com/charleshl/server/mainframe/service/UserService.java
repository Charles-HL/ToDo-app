package com.charleshl.server.mainframe.service;

import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

@Service
@Lazy
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDO> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDO> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserDO saveUser(UserDO userDO) {
        return userRepository.save(userDO);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDO getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
