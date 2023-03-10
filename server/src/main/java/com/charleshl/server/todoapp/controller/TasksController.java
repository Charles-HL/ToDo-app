package com.charleshl.server.todoapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TasksController {
    @GetMapping("/tasks")
    public String getMyTasks() {
        return "It works";
    }
}
