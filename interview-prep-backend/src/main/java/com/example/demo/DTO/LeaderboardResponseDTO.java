package com.example.demo.DTO;

import lombok.Data;

@Data
public class LeaderboardResponseDTO {

    private int rank;

    private String name;

    private String email;

    private int totalAttempts;

    private int totalQuestions;

    private int totalCorrect;

    private double averageAccuracy;
}