package com.fitnesstracker.fittrack.controller;

import com.fitnesstracker.fittrack.user.User;
import com.fitnesstracker.fittrack.rep.UserRep;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
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
}