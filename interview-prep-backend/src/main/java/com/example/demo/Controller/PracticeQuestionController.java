package com.example.demo.Controller;

import com.example.demo.DTO.QuestionResponseDTO;
import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class PracticeQuestionController {

    private final QuestionRepository questionRepository;


    // =====================================================
    // GET ALL CATEGORIES
    // =====================================================

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {

        List<String> categories =
                questionRepository.findDistinctCategories();

        return ResponseEntity.ok(categories);
    }


    // =====================================================
    // GET PRACTICE QUESTIONS
    //
    // Example:
    //
    // /api/questions/practice
    // ?categories=Java,DSA,Python
    // &difficulties=EASY,MEDIUM
    // &count=20
    //
    // =====================================================

    @GetMapping("/practice")
    public ResponseEntity<?> getPracticeQuestions(

            @RequestParam List<String> categories,

            @RequestParam List<String> difficulties,

            @RequestParam int count

    ) {

        // =================================================
        // VALIDATE CATEGORIES
        // =================================================

        if (categories == null ||
                categories.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Please select at least one category."
                    );
        }


        // =================================================
        // VALIDATE DIFFICULTIES
        // =================================================

        if (difficulties == null ||
                difficulties.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Please select at least one difficulty."
                    );
        }


        // =================================================
        // VALIDATE QUESTION COUNT
        // =================================================

        if (count <= 0) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Question count must be greater than 0."
                    );
        }


        // =================================================
        // CLEAN INPUT
        // =================================================

        List<String> cleanCategories =
                categories.stream()
                        .map(String::trim)
                        .filter(value ->
                                !value.isEmpty())
                        .distinct()
                        .toList();


        List<String> cleanDifficulties =
                difficulties.stream()
                        .map(String::trim)
                        .map(String::toUpperCase)
                        .filter(value ->
                                !value.isEmpty())
                        .distinct()
                        .toList();


        // =================================================
        // FIND MATCHING QUESTIONS
        // =================================================

        List<Question> questions =
                questionRepository.findPracticeQuestions(
                        cleanCategories,
                        cleanDifficulties
                );


        // =================================================
        // NO QUESTIONS
        // =================================================

        if (questions.isEmpty()) {

            return ResponseEntity
                    .ok(List.of());
        }


        // =================================================
        // RANDOMIZE
        // =================================================

        Collections.shuffle(questions);


        // =================================================
        // SELECT REQUESTED NUMBER
        // =================================================

        int resultCount =
                Math.min(
                        count,
                        questions.size()
                );


        List<Question> selectedQuestions =
                questions.subList(
                        0,
                        resultCount
                );


        // =================================================
        // CONVERT TO DTO
        // =================================================

        List<QuestionResponseDTO> response =
                selectedQuestions.stream()
                        .map(this::convertToDTO)
                        .toList();


        return ResponseEntity.ok(response);
    }


    // =====================================================
    // CONVERT QUESTION → DTO
    // =====================================================

    private QuestionResponseDTO convertToDTO(
            Question question
    ) {

        QuestionResponseDTO dto =
                new QuestionResponseDTO();


        dto.setId(
                question.getId()
        );


        dto.setQuestionText(
                question.getQuestionText()
        );


        dto.setCategory(
                question.getCategory()
        );


        dto.setDifficulty(
                question.getDifficulty()
        );


        dto.setType(
                question.getType()
        );


        dto.setOptionA(
                question.getOptionA()
        );


        dto.setOptionB(
                question.getOptionB()
        );


        dto.setOptionC(
                question.getOptionC()
        );


        dto.setOptionD(
                question.getOptionD()
        );


        return dto;
    }
}