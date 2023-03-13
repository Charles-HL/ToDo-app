package com.charleshl.server.todoapp.repository;

import com.charleshl.server.todoapp.entity.TaskDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<TaskDO, Long> {
    // add custom queries here, if needed
}
