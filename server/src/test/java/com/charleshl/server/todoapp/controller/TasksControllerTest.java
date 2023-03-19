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
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class TasksControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TasksController tasksController;

    UserDO userDO;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDO = new UserDO("test_user", "");
        Authentication authentication = new UsernamePasswordAuthenticationToken(new UserPrincipal(userDO), null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    void testGetMyTasks() {
        // Mocking
        when(userService.getUserByUsername(userDO.getUsername())).thenReturn(userDO);
        List<TaskDO> tasks = new ArrayList<>();
        tasks.add(new TaskDO("Test Task", "Test Description", userDO));
        when(taskService.getAllTasksByUser(userDO)).thenReturn(tasks);

        // Test
        ResponseEntity<List<TaskDO>> responseEntity = tasksController.getMyTasks();

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        System.out.println(responseEntity.getBody());
        assertEquals(tasks, responseEntity.getBody());
        verify(userService, times(1)).getUserByUsername(userDO.getUsername());
        verify(taskService, times(1)).getAllTasksByUser(userDO);
    }

    @Test
    void testPostIsTaskDone() {
        // Mocking

        TaskDO task = new TaskDO("Test Task", "Test Description", userDO);
        task.setId(8L);
        when(taskService.getTaskById(8L)).thenReturn(task);
        when(taskService.saveTask(task)).thenReturn(task);

        // Test
        ResponseEntity<TaskDO> responseEntity = tasksController.postIsTaskDone(8L, true);

        // Assertions
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(task, responseEntity.getBody());
        assertTrue(task.isDone());
        verify(taskService, times(1)).getTaskById(8L);
        verify(taskService, times(1)).saveTask(task);
    }

    @Test
    public void testGetTaskById() {
        // Arrange
        long taskId = 3L;
        UserDO testUser = new UserDO("test_user", "");
        TaskDO taskDO = new TaskDO("Test task", "Test task description", testUser);
        when(taskService.getTaskById(taskId)).thenReturn(taskDO);

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

        // Act
        ResponseEntity<TaskDO> response = tasksController.getTaskById(taskId);

        // Assert
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void putTask() {
        TaskDO taskDO = new TaskDO();
        taskDO.setId(5L);
        taskDO.setName("Test task");
        taskDO.setDescription("This is a test task");
        taskDO.setDone(false);

        when(taskService.saveTask(any(TaskDO.class))).thenReturn(taskDO);

        ResponseEntity<TaskDO> responseEntity = tasksController.putTask(taskDO);

        verify(taskService, times(1)).saveTask(any(TaskDO.class));
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(taskDO, responseEntity.getBody());
    }

}
