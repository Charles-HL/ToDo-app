package com.charleshl.todoapp.repository;

import com.charleshl.todoapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // add custom queries here, if needed
}
