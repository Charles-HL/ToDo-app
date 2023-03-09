package com.charleshl.server.todoapp.service;

import com.charleshl.server.todoapp.entity.TaskDO;
import com.charleshl.server.todoapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDO> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<TaskDO> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public TaskDO saveTask(TaskDO taskDO) {
        return taskRepository.save(taskDO);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
