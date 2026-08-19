package com.example.demo.Controller;

import com.example.demo.DTO.DashboardResponseDTO;
import com.example.demo.DTO.RecentPracticeDTO;
import com.example.demo.Entity.PracticeAttempt;
import com.example.demo.Entity.User;
import com.example.demo.Repository.PracticeAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final PracticeAttemptRepository practiceAttemptRepository;

    @GetMapping
    public ResponseEntity<DashboardResponseDTO> getDashboard(
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        List<PracticeAttempt> attempts =
                practiceAttemptRepository
                        .findByUserEmailOrderByCompletedAtDesc(
                                user.getEmail()
                        );

        DashboardResponseDTO dashboard =
                new DashboardResponseDTO();

        int totalAttempts = attempts.size();

        int totalQuestions = 0;
        int totalCorrect = 0;
        int totalWrong = 0;

        double totalScore = 0;
        double totalAccuracy = 0;

        for (PracticeAttempt attempt : attempts) {

            totalQuestions +=
                    attempt.getTotalQuestions();

            totalCorrect +=
                    attempt.getCorrectAnswers();

            totalWrong +=
                    attempt.getWrongAnswers();

            totalScore +=
                    attempt.getScore();

            totalAccuracy +=
                    attempt.getAccuracy();
        }

        dashboard.setTotalAttempts(totalAttempts);

        dashboard.setTotalQuestions(totalQuestions);

        dashboard.setTotalCorrect(totalCorrect);

        dashboard.setTotalWrong(totalWrong);

        dashboard.setAverageScore(
                totalAttempts > 0
                        ? totalScore / totalAttempts
                        : 0
        );

        dashboard.setAverageAccuracy(
                totalAttempts > 0
                        ? totalAccuracy / totalAttempts
                        : 0
        );


        // Recent 5 practices

        List<RecentPracticeDTO> recentPractices =
                attempts.stream()
                        .limit(5)
                        .map(this::convertToDTO)
                        .toList();

        dashboard.setRecentPractices(
                recentPractices
        );

        return ResponseEntity.ok(dashboard);
    }


    private RecentPracticeDTO convertToDTO(
            PracticeAttempt attempt
    ) {

        RecentPracticeDTO dto =
                new RecentPracticeDTO();

        dto.setId(attempt.getId());

        dto.setCategory(
                attempt.getCategory()
        );

        dto.setDifficulty(
                attempt.getDifficulty()
        );

        dto.setTotalQuestions(
                attempt.getTotalQuestions()
        );

        dto.setCorrectAnswers(
                attempt.getCorrectAnswers()
        );

        dto.setWrongAnswers(
                attempt.getWrongAnswers()
        );

        dto.setScore(
                attempt.getScore()
        );

        dto.setAccuracy(
                attempt.getAccuracy()
        );

        dto.setCompletedAt(
                attempt.getCompletedAt()
        );

        return dto;
    }
}