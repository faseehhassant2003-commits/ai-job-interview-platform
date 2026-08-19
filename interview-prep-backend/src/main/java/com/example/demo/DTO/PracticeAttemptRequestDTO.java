package com.example.demo.DTO;

import lombok.Data;

@Data
public class PracticeAttemptRequestDTO {

    private String category;
    private String difficulty;

    private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;

    private double score;
    private double accuracy;
}