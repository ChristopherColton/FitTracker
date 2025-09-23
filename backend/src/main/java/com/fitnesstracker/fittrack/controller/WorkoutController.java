package com.fitnesstracker.fittrack.controller;

import com.fitnesstracker.fittrack.rep.WorkoutRep;
import com.fitnesstracker.fittrack.user.Workout;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/workouts")
public class WorkoutController {
    private final WorkoutRep repo;

    public WorkoutController(WorkoutRep repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Workout> getAllWorkouts() {
        return repo.findAll();
    }

    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {
        return repo.save(workout);
    }

    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }
    @GetMapping("/user/{userId}")
    public List<Workout> getWorkoutsByUserId(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }
}
