/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.todoapp.service;

import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.todoapp.entity.TaskDO;
import com.charleshl.server.todoapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Task service class
 *
 * @author Charles HL
 */
@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDO> getAllTasks() {
        return taskRepository.findAll();
    }

    public TaskDO getTaskById(Long id) {
        return taskRepository.findById(id).get();
    }

    public TaskDO saveTask(TaskDO taskDO) {
        return taskRepository.save(taskDO);
    }

    public void saveAllTasks(List<TaskDO> taskDOList) {
        taskRepository.saveAll(taskDOList);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    /**
     * Get all tasks of a user
     * @param userDO user
     * @return list of tasks
     */
    public List<TaskDO> getAllTasksByUser(UserDO userDO) {
        return taskRepository.getAllByUserDO(userDO);
    }

    /**
     * Delete all tasks of a user
     * @param user user
     */
    public void deleteAll(UserDO user) {
        taskRepository.getAllByUserDO(user).forEach(taskRepository::delete);
    }
}
