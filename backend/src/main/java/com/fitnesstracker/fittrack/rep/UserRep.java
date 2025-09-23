package com.fitnesstracker.fittrack.rep;

import com.fitnesstracker.fittrack.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRep extends JpaRepository<User, Long>{
    User findByUsername(String username);
}
