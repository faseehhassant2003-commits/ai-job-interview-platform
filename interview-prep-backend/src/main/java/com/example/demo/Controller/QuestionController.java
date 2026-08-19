package com.example.demo.Controller;

import com.example.demo.DTO.QuestionResponseDTO;
import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public ResponseEntity<List<QuestionResponseDTO>> getAllQuestions() {

        List<QuestionResponseDTO> questions = questionRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponseDTO> getQuestionById(@PathVariable Long id) {

        return questionRepository.findById(id)
                .map(question -> ResponseEntity.ok(convertToDTO(question)))
                .orElse(ResponseEntity.notFound().build());
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