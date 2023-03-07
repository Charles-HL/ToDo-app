package com.charleshl.todoapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import javax.persistence.Column;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Task() {}

    public Task(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Task(String name, String description, User user) {
        this.name = name;
        this.description = description;
        this.user = user;
    }
}

