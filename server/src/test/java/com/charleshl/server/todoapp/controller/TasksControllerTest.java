package com.charleshl.server.todoapp.controller;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.service.UserService;
import com.charleshl.server.todoapp.entity.TaskDO;
import com.charleshl.server.todoapp.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

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

    @Test
    public void testGetTaskById() {
        // Arrange
        long taskId = 1L;
        UserDO testUser = new UserDO("test_user", "");
        TaskDO taskDO = new TaskDO("Test task", "Test task description", testUser);
        when(taskService.getTaskById(taskId)).thenReturn(taskDO);
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        UserPrincipal userDetails = new UserPrincipal(testUser);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        // Act
        ResponseEntity<TaskDO> response = tasksController.getTaskById(taskId);

        // Assert
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(taskDO, response.getBody());
    }

    @Test
    public void testGetTaskByIdWithInvalidId() {
        // Arrange
        long taskId = 2L;
        when(taskService.getTaskById(taskId)).thenThrow(EntityNotFoundException.class);

        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("test_user");
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        // Act
        ResponseEntity<TaskDO> response = tasksController.getTaskById(taskId);

        // Assert
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

}
