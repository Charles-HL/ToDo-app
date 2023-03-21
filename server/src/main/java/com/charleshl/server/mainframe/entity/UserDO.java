/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

/**
 * User DO
 *
 * @author Charles
 */
@Entity
@Table(name = "users", schema = "myschema")
@Data
public class UserDO {

    /**
     * The id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * The username
     */
    @Column(name = "username", columnDefinition = "VARCHAR(255)")
    private String username;

    /**
     * The password
     */
    @Column(name = "password", columnDefinition = "VARCHAR(255)")
    @JsonIgnore
    private String password;

    /**
     * Constructor
     */
    public UserDO() {}

    /**
     * Constructor
     * @param username The username
     * @param password The password
     */
    public UserDO(String username, String password) {
        this.username = username;
        this.password = password;
    }
}

