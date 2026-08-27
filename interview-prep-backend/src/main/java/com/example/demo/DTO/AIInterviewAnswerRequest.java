package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIInterviewAnswerRequest {

    private String question;

    private String answer;

    private String topic;

    private String difficulty;

    private String interviewType;
}