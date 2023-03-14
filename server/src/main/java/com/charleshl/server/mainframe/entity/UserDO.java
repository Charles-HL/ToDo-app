package com.charleshl.server.mainframe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "users", schema = "myschema")
@Data
public class UserDO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username", columnDefinition = "VARCHAR(255)")
    private String username;

    @Column(name = "password", columnDefinition = "VARCHAR(255)")
    @JsonIgnore
    private String password;

    public UserDO() {}

    public UserDO(String username, String password) {
        this.username = username;
        this.password = password;
    }
}

