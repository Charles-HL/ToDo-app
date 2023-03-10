package com.charleshl.server.mainframe.repository;

import com.charleshl.server.mainframe.entity.UserDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDO, Long> {
    UserDO findByUsername(String username);
}
