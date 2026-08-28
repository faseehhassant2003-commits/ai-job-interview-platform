package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIInterviewEvaluationResponseDTO {

    private int score;

    private String feedback;

    private String strengths;

    private String improvements;

    private String idealAnswer;

    private String followUpQuestion;
}