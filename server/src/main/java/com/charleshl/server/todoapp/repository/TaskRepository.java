/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.todoapp.repository;

import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.todoapp.entity.TaskDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Task repository
 *
 * @author Charles HL
 */
@Repository
public interface TaskRepository extends JpaRepository<TaskDO, Long> {

    /**
     * Get all tasks by user
     * @param userDO The user
     * @return The tasks
     */
    List<TaskDO> getAllByUserDO(UserDO userDO);
}
