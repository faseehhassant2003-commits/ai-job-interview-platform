package com.example.demo.DTO;

import lombok.Data;

@Data
public class QuestionResponseDTO {

    private Long id;
    private String questionText;
    private String category;
    private String difficulty;
    private String type;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}