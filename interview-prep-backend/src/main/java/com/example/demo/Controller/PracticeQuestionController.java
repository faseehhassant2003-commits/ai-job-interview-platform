package com.example.demo.Controller;

import com.example.demo.DTO.QuestionResponseDTO;
import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class PracticeQuestionController {

    private final QuestionRepository questionRepository;

    @GetMapping("/practice")
    public ResponseEntity<List<QuestionResponseDTO>> getPracticeQuestions(
            @RequestParam String category,
            @RequestParam String difficulty
    ) {

        List<Question> questions =
                questionRepository.findByCategoryAndDifficulty(
                        category,
                        difficulty
                );

        List<QuestionResponseDTO> response =
                questions.stream()
                        .map(this::convertToDTO)
                        .toList();

        return ResponseEntity.ok(response);
    }

    private QuestionResponseDTO convertToDTO(Question question) {

        QuestionResponseDTO dto = new QuestionResponseDTO();

        dto.setId(question.getId());
        dto.setQuestionText(question.getQuestionText());
        dto.setCategory(question.getCategory());
        dto.setDifficulty(question.getDifficulty());
        dto.setType(question.getType());

        dto.setOptionA(question.getOptionA());
        dto.setOptionB(question.getOptionB());
        dto.setOptionC(question.getOptionC());
        dto.setOptionD(question.getOptionD());

        return dto;
    }
}