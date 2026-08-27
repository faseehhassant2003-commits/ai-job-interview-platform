package com.example.demo.Controller;

import com.example.demo.DTO.QuestionRequestDTO;
import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class AdminQuestionController {

    private final QuestionRepository questionRepository;


    // =====================================================
    // ADD QUESTION
    // =====================================================

    @PostMapping
    public ResponseEntity<Question> addQuestion(
            @RequestBody QuestionRequestDTO request
    ) {

        Question question = new Question();

        question.setQuestionText(
                request.getQuestionText()
        );

        question.setCategory(
                request.getCategory()
        );

        question.setDifficulty(
                request.getDifficulty()
        );

        question.setType(
                request.getType()
        );

        question.setOptionA(
                request.getOptionA()
        );

        question.setOptionB(
                request.getOptionB()
        );

        question.setOptionC(
                request.getOptionC()
        );

        question.setOptionD(
                request.getOptionD()
        );

        question.setCorrectAnswer(
                request.getCorrectAnswer()
        );

        question.setExplanation(
                request.getExplanation()
        );

        Question savedQuestion =
                questionRepository.save(question);

        return ResponseEntity.ok(savedQuestion);
    }


    // =====================================================
    // DELETE ONE QUESTION
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(
            @PathVariable Long id
    ) {

        if (!questionRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        questionRepository.deleteById(id);

        return ResponseEntity.ok(
                "Question deleted successfully"
        );
    }


    // =====================================================
    // DELETE ALL QUESTIONS FROM CATEGORY
    // =====================================================

    @DeleteMapping("/category/{category}")
    public ResponseEntity<String> deleteQuestionsByCategory(
            @PathVariable String category
    ) {

        if (category == null ||
                category.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Category cannot be empty."
                    );
        }

        String cleanCategory =
                category.trim();


        int deletedCount =
                questionRepository.deleteByCategory(
                        cleanCategory
                );


        if (deletedCount == 0) {

            return ResponseEntity.ok(
                    "No questions found in category: "
                            + cleanCategory
            );
        }


        return ResponseEntity.ok(
                deletedCount
                        + " question(s) deleted from category: "
                        + cleanCategory
        );
    }


    // =====================================================
    // UPDATE QUESTION
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionRequestDTO request
    ) {

        Question question =
                questionRepository
                        .findById(id)
                        .orElse(null);


        if (question == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }


        question.setQuestionText(
                request.getQuestionText()
        );

        question.setCategory(
                request.getCategory()
        );

        question.setDifficulty(
                request.getDifficulty()
        );

        question.setType(
                request.getType()
        );

        question.setOptionA(
                request.getOptionA()
        );

        question.setOptionB(
                request.getOptionB()
        );

        question.setOptionC(
                request.getOptionC()
        );

        question.setOptionD(
                request.getOptionD()
        );

        question.setCorrectAnswer(
                request.getCorrectAnswer()
        );

        question.setExplanation(
                request.getExplanation()
        );


        Question updatedQuestion =
                questionRepository.save(
                        question
                );


        return ResponseEntity.ok(
                updatedQuestion
        );
    }


    // =====================================================
    // GET ALL ADMIN QUESTIONS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Question>>
    getAllAdminQuestions() {

        List<Question> questions =
                questionRepository.findAll();

        return ResponseEntity.ok(
                questions
        );
    }
}