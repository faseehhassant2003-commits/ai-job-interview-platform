package com.example.demo.DTO;

import lombok.Data;

@Data
public class AnswerRequestDTO {
    private Long questionId;
    private String selectedAnswer;
}
