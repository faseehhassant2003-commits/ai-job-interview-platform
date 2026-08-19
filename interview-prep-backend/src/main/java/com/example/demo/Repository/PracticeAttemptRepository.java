package com.example.demo.Repository;

import com.example.demo.Entity.PracticeAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PracticeAttemptRepository
        extends JpaRepository<PracticeAttempt, Long> {

    List<PracticeAttempt> findByUserEmailOrderByCompletedAtDesc(
            String userEmail
    );

    List<PracticeAttempt> findAllByOrderByCompletedAtDesc();
}