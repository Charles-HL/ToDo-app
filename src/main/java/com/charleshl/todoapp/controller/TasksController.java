package com.charleshl.todoapp.controller;

import com.charleshl.todoapp.entity.Task;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TasksController {
    @GetMapping("/tasks")
    public List<Task> getMyTasks() {
        return new ArrayList<>();
    }
}
