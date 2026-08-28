package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIInterviewAnswerRequest {

    // =====================================================
    // CURRENT QUESTION
    // =====================================================

    private String question;


    // =====================================================
    // CANDIDATE ANSWER
    // =====================================================

    private String answer;


    // =====================================================
    // INTERVIEW DETAILS
    // =====================================================

    private String topic;

    private String difficulty;

    private String interviewType;


    // =====================================================
    // INTERVIEW PROGRESS
    // =====================================================

    private int questionNumber;

    private int totalQuestions;
}