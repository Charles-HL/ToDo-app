/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.todoapp.controller;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.service.UserService;
import com.charleshl.server.todoapp.entity.TaskDO;
import com.charleshl.server.todoapp.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Tasks controller class
 *
 * @author Charles HL
 */
@RestController
public class TasksController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    /**
     * Add a task to the current user.
     *
     * @param taskDO The task to be added.
     * @return TaskDO
     */
    @PutMapping("/task")
    public ResponseEntity<TaskDO> putTask(TaskDO taskDO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserPrincipal) authentication.getPrincipal()).getUsername();
        UserDO user = userService.getUserByUsername(username);
        taskDO.setUserDO(user);
        taskDO = taskService.saveTask(taskDO);
        return new ResponseEntity<>(taskDO, HttpStatus.OK);
    }

    /**
     * Returns all tasks for the current user.
     *
     * @return List<TaskDO>
     */
    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDO>> getMyTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserPrincipal) authentication.getPrincipal()).getUsername();
        UserDO user = userService.getUserByUsername(username);
        return new ResponseEntity<>(taskService.getAllTasksByUser(user), HttpStatus.OK);
    }

    /**
     * Creates a new task.
     *
     * @param id The id of the task to be created.
     * @param isDone The status of the task to be created.
     * @return TaskDO
     */
    @PostMapping("/task/{id}/done/{isDone}")
    public ResponseEntity<TaskDO> postIsTaskDone(@PathVariable("id") long id, @PathVariable("isDone") boolean isDone) {
        try {
            TaskDO taskDO = taskService.getTaskById(id);
            checkUserPermission(taskDO);
            taskDO.setDone(isDone);
            taskDO = taskService.saveTask(taskDO);
            return new ResponseEntity<>(taskDO, HttpStatus.OK);
        } catch (EntityNotFoundException e)  {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Returns a task by its id.
     *
     * @param id The id of the task to be returned.
     * @return TaskDO
     */
    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDO> getTaskById(@PathVariable("id") long id) {
        try {
            TaskDO taskDO = taskService.getTaskById(id);
            checkUserPermission(taskDO);
            return new ResponseEntity<>(taskDO, HttpStatus.OK);
        } catch (EntityNotFoundException | NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Checks if the user has permission to access the task.
     * @param taskDO The task to be checked.
     */
    private void checkUserPermission(TaskDO taskDO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserPrincipal) authentication.getPrincipal()).getUsername();
        if (!taskDO.getUserDO().getUsername().equals(username)) {
            throw new SecurityException("User does not have permission to access this task");
        }
    }
}
