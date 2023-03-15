package com.charleshl.server.todoapp.controller;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.service.UserService;
import com.charleshl.server.todoapp.entity.TaskDO;
import com.charleshl.server.todoapp.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TasksControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TasksController tasksController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetMyTasks() {
        // Mocking
        Authentication authentication = new UsernamePasswordAuthenticationToken(new UserPrincipal(new UserDO("admin_todo_app", "")), null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDO user = new UserDO();
        user.setUsername("admin_todo_app");
        when(userService.getUserByUsername(user.getUsername())).thenReturn(user);
        List<TaskDO> tasks = new ArrayList<>();
        tasks.add(new TaskDO("Test Task", "Test Description", user));
        when(taskService.getAllTasksByUser(user)).thenReturn(tasks);

        // Test
        ResponseEntity<List<TaskDO>> responseEntity = tasksController.getMyTasks();

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(tasks, responseEntity.getBody());
        verify(userService, times(1)).getUserByUsername(user.getUsername());
        verify(taskService, times(1)).getAllTasksByUser(user);
    }

    @Test
    void testPostIsTaskDone() {
        // Mocking
        TaskDO task = new TaskDO("Test Task", "Test Description", new UserDO());
        when(taskService.getTaskById(1L)).thenReturn(task);

        // Test
        ResponseEntity<TaskDO> responseEntity = tasksController.postIsTaskDone(1L, true);

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(task, responseEntity.getBody());
        assertEquals(true, task.isDone());
        verify(taskService, times(1)).getTaskById(1L);
        verify(taskService, times(1)).saveTask(task);
    }
}
