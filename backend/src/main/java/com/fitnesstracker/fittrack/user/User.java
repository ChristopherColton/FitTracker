package com.fitnesstracker.fittrack.user;

import java.util.List;
import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String email;
    private String password;

    @OneToMany
    private List<Workout> workouts;
}
