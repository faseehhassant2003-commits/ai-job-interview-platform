package com.example.demo.Controller;

import com.example.demo.DTO.LeaderboardResponseDTO;
import com.example.demo.Entity.PracticeAttempt;
import com.example.demo.Entity.User;
import com.example.demo.Repository.PracticeAttemptRepository;
import com.example.demo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final PracticeAttemptRepository practiceAttemptRepository;
    private final UserRepository userRepository;


    @GetMapping
    public ResponseEntity<List<LeaderboardResponseDTO>>
    getLeaderboard() {

        List<PracticeAttempt> attempts =
                practiceAttemptRepository
                        .findAllByOrderByCompletedAtDesc();


        // Group attempts by user email
        Map<String, List<PracticeAttempt>> groupedAttempts =
                attempts.stream()
                        .collect(
                                Collectors.groupingBy(
                                        PracticeAttempt::getUserEmail
                                )
                        );


        List<LeaderboardResponseDTO> leaderboard =
                new ArrayList<>();


        for (Map.Entry<String, List<PracticeAttempt>> entry
                : groupedAttempts.entrySet()) {

            String email = entry.getKey();

            List<PracticeAttempt> userAttempts =
                    entry.getValue();


            Optional<User> optionalUser =
                    userRepository.findByEmail(email);


            if (optionalUser.isEmpty()) {
                continue;
            }


            User user = optionalUser.get();


            int totalAttempts =
                    userAttempts.size();

            int totalQuestions =
                    userAttempts.stream()
                            .mapToInt(
                                    PracticeAttempt::getTotalQuestions
                            )
                            .sum();

            int totalCorrect =
                    userAttempts.stream()
                            .mapToInt(
                                    PracticeAttempt::getCorrectAnswers
                            )
                            .sum();


            double averageAccuracy =
                    userAttempts.stream()
                            .mapToDouble(
                                    PracticeAttempt::getAccuracy
                            )
                            .average()
                            .orElse(0);


            LeaderboardResponseDTO dto =
                    new LeaderboardResponseDTO();

            dto.setName(user.getName());

            dto.setEmail(user.getEmail());

            dto.setTotalAttempts(
                    totalAttempts
            );

            dto.setTotalQuestions(
                    totalQuestions
            );

            dto.setTotalCorrect(
                    totalCorrect
            );

            dto.setAverageAccuracy(
                    averageAccuracy
            );


            leaderboard.add(dto);
        }


        // Highest accuracy first
        leaderboard.sort(
                Comparator.comparingDouble(
                        LeaderboardResponseDTO::getAverageAccuracy
                ).reversed()
        );


        // Assign ranks
        for (int i = 0; i < leaderboard.size(); i++) {

            leaderboard
                    .get(i)
                    .setRank(i + 1);
        }


        return ResponseEntity.ok(leaderboard);
    }
}