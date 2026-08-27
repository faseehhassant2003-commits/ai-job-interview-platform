package com.example.demo.Repository;

import com.example.demo.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // =====================================================
    // OLD PRACTICE QUERY
    // Keep this because other parts of the project may use it
    // =====================================================

    List<Question> findByCategoryAndDifficulty(
            String category,
            String difficulty
    );


    // =====================================================
    // GET UNIQUE CATEGORIES
    // =====================================================

    @Query("""
            SELECT DISTINCT q.category
            FROM Question q
            WHERE q.category IS NOT NULL
            AND q.category <> ''
            ORDER BY q.category
            """)
    List<String> findDistinctCategories();


    // =====================================================
    // MULTIPLE CATEGORIES + MULTIPLE DIFFICULTIES
    // =====================================================

    @Query("""
            SELECT q
            FROM Question q
            WHERE q.category IN :categories
            AND q.difficulty IN :difficulties
            """)
    List<Question> findPracticeQuestions(
            @Param("categories")
            List<String> categories,

            @Param("difficulties")
            List<String> difficulties
    );


    // =====================================================
    // DELETE QUESTIONS BY CATEGORY
    // =====================================================

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    @Query("""
            DELETE FROM Question q
            WHERE q.category = :category
            """)
    int deleteByCategory(
            @Param("category")
            String category
    );
}