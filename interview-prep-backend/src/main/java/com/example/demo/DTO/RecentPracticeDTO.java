package com.example.demo.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecentPracticeDTO {

    private Long id;

    private String category;

    private String difficulty;

    private int totalQuestions;

    private int correctAnswers;

    private int wrongAnswers;

    private double score;

    private double accuracy;

    private LocalDateTime completedAt;
}