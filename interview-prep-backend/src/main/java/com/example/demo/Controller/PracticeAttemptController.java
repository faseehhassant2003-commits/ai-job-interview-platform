package com.example.demo.Controller;

import com.example.demo.DTO.PracticeAttemptRequestDTO;
import com.example.demo.Entity.PracticeAttempt;
import com.example.demo.Entity.User;
import com.example.demo.Repository.PracticeAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/practice/history")
@RequiredArgsConstructor
public class PracticeAttemptController {

    private final PracticeAttemptRepository practiceAttemptRepository;


    // =========================================
    // SAVE PRACTICE ATTEMPT
    // =========================================

    @PostMapping
    public ResponseEntity<PracticeAttempt> saveAttempt(
            @RequestBody PracticeAttemptRequestDTO request,
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        PracticeAttempt attempt = new PracticeAttempt();

        attempt.setCategory(request.getCategory());

        attempt.setDifficulty(
                request.getDifficulty()
        );

        attempt.setTotalQuestions(
                request.getTotalQuestions()
        );

        attempt.setCorrectAnswers(
                request.getCorrectAnswers()
        );

        attempt.setWrongAnswers(
                request.getWrongAnswers()
        );

        attempt.setScore(
                request.getScore()
        );

        attempt.setAccuracy(
                request.getAccuracy()
        );

        attempt.setCompletedAt(
                LocalDateTime.now()
        );

        // Get email from authenticated user
        attempt.setUserEmail(
                user.getEmail()
        );

        PracticeAttempt saved =
                practiceAttemptRepository.save(attempt);

        return ResponseEntity.ok(saved);
    }


    // =========================================
    // GET CURRENT USER'S HISTORY
    // =========================================

    @GetMapping
    public ResponseEntity<List<PracticeAttempt>> getHistory(
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        String email = user.getEmail();

        List<PracticeAttempt> history =
                practiceAttemptRepository
                        .findByUserEmailOrderByCompletedAtDesc(
                                email
                        );

        return ResponseEntity.ok(history);
    }
}