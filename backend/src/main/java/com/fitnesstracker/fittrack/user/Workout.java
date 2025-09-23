package com.fitnesstracker.fittrack.user;

import jakarta.persistence.*;
import java.time.LocalDate;

public class Workout {
    @Id
    @GeneratedValue
    private Long id;

    private String type; 
    private int duration;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
