package com.fitnesstracker.fittrack.rep;

import com.fitnesstracker.fittrack.user.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutRep extends JpaRepository<Workout, Long>{
    List<Workout> findByUserId(Long userId);
    List<Workout> findByUserIdAndExercise(Long userId, String exercise);
}
