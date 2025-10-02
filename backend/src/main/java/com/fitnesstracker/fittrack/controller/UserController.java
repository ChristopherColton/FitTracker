package com.fitnesstracker.fittrack.controller;

import com.fitnesstracker.fittrack.user.User;
import com.fitnesstracker.fittrack.rep.UserRep;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController{
    private final UserRep repo;

    public UserController(UserRep repo){
        this.repo = repo;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return repo.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return repo.save(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return repo.findById(id).orElse(null);
    }   

    @GetMapping("/test")
    public String testUsers() {
        return "Users endpoint is working 🚀";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Email is already in use!");
        }
        User savedUser = repo.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User loginUser) {
        return repo.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword())
        .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}