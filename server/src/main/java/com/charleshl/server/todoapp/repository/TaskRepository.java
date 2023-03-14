package com.charleshl.server.todoapp.repository;

import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.todoapp.entity.TaskDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskDO, Long> {
    List<TaskDO> getAllByUserDO(UserDO userDO);
}
