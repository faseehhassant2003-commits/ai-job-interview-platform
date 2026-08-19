package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "practice_attempts")
@Data
public class PracticeAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private String difficulty;

    private int totalQuestions;

    private int correctAnswers;

    private int wrongAnswers;

    private double score;

    private double accuracy;

    private LocalDateTime completedAt;

    private String userEmail;
}