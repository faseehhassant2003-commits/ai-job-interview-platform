package com.example.demo.DTO;

import lombok.Data;

import java.util.List;

@Data
public class DashboardResponseDTO {

    private int totalAttempts;

    private double averageScore;

    private double averageAccuracy;

    private int totalQuestions;

    private int totalCorrect;

    private int totalWrong;

    private List<RecentPracticeDTO> recentPractices;
}