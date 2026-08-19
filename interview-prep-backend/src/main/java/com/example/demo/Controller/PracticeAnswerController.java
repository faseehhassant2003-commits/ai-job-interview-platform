package com.example.demo.Controller;

import com.example.demo.DTO.AnswerRequestDTO;
import com.example.demo.DTO.AnswerResponseDTO;
import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/practice")
@RequiredArgsConstructor
public class PracticeAnswerController {

    private final QuestionRepository questionRepository;

    @PostMapping("/answer")
    public ResponseEntity<AnswerResponseDTO> checkAnswer(
            @RequestBody AnswerRequestDTO request
    ) {

        Question question = questionRepository
                .findById(request.getQuestionId())
                .orElse(null);

        if (question == null) {
            return ResponseEntity.notFound().build();
        }

        boolean correct = question.getCorrectAnswer()
                .equalsIgnoreCase(request.getSelectedAnswer());

        AnswerResponseDTO response = new AnswerResponseDTO();

        response.setCorrect(correct);
        response.setCorrectAnswer(question.getCorrectAnswer());
        response.setExplanation(question.getExplanation());

        return ResponseEntity.ok(response);
    }
}