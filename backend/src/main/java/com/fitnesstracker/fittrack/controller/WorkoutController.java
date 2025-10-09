package com.fitnesstracker.fittrack.controller;

import com.fitnesstracker.fittrack.rep.WorkoutRep;
import com.fitnesstracker.fittrack.user.Workout;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/users/{userId}")
    public List<Workout> getWorkoutsByUserId(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    @GetMapping("/users/{userId}/exercise/{exercise}")
    public List<Workout> getWorkoutsByUserIdAndExercise(@PathVariable Long userId, @PathVariable String exercise) {
        return repo.findByUserIdAndExercise(userId, exercise);
    }

    @PutMapping("/{id}")
    public Workout updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        return repo.findById(id).map(existingWorkout -> {
            existingWorkout.setExercise(workout.getExercise());
            existingWorkout.setSets(workout.getSets());
            existingWorkout.setReps(workout.getReps());
            existingWorkout.setWeight(workout.getWeight());
            existingWorkout.setDate(workout.getDate());
            return repo.save(existingWorkout);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
