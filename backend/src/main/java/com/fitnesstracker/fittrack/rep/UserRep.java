package com.fitnesstracker.fittrack.rep;

import com.fitnesstracker.fittrack.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRep extends JpaRepository<User, Long>{
     Optional<User> findByEmailAndPassword(String email, String password);
}
