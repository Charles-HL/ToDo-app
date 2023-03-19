/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.todoapp.entity;

import com.charleshl.server.mainframe.entity.UserDO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


/**
 * Task DO
 *
 * @author Charles HL
 */
@Entity
@Table(name = "tasks", schema = "myschema")
@Data
public class TaskDO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "done")
    private boolean done;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserDO userDO;

    public TaskDO() {}

    public TaskDO(String name, UserDO userDO) {
        this.name = name;
        this.userDO = userDO;
    }

    public TaskDO(String name, String description, UserDO userDO) {
        this.name = name;
        this.description = description;
        this.userDO = userDO;
    }
}

