package com.example.demo.DTO;

import lombok.Data;

@Data
public class AnswerResponseDTO {
    private boolean correct;
    private String correctAnswer;
    private String explanation;

}
