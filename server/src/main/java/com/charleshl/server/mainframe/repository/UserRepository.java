/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
package com.charleshl.server.mainframe.repository;

import com.charleshl.server.mainframe.entity.UserDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * User repository
 *
 * @author Charles HL
 */
@Repository
public interface UserRepository extends JpaRepository<UserDO, Long> {

    /**
     * Find user by username
     * @param username The username
     * @return The user
     */
    UserDO findByUsername(String username);
}
