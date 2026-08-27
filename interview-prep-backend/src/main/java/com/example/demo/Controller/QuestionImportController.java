package com.example.demo.Controller;

import com.example.demo.Entity.Question;
import com.example.demo.Repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class QuestionImportController {

    private final QuestionRepository questionRepository;

    @PostMapping("/import")
    public ResponseEntity<?> importQuestions(
            @RequestParam("file") MultipartFile file
    ) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Please select a CSV file.");
        }

        String fileName = file.getOriginalFilename();

        if (fileName == null ||
                !fileName.toLowerCase().endsWith(".csv")) {

            return ResponseEntity.badRequest()
                    .body("Only CSV files are allowed.");
        }

        int imported = 0;
        int failed = 0;

        List<String> errors = new ArrayList<>();

        try (
                Reader reader = new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8
                );

                CSVParser csvParser = CSVFormat.DEFAULT.builder()
                        .setHeader()
                        .setSkipHeaderRecord(true)
                        .setIgnoreEmptyLines(true)
                        .setTrim(true)
                        .build()
                        .parse(reader)
        ) {

            for (CSVRecord record : csvParser) {

                long rowNumber = record.getRecordNumber() + 1;

                try {

                    String questionText =
                            getValue(record, "questionText");

                    String category =
                            getValue(record, "category");

                    String difficulty =
                            getValue(record, "difficulty");

                    String type =
                            getValue(record, "type");

                    String optionA =
                            getValue(record, "optionA");

                    String optionB =
                            getValue(record, "optionB");

                    String optionC =
                            getValue(record, "optionC");

                    String optionD =
                            getValue(record, "optionD");

                    String correctAnswer =
                            getValue(record, "correctAnswer");

                    String explanation =
                            getValue(record, "explanation");


                    // -----------------------------------------
                    // VALIDATION
                    // -----------------------------------------

                    if (questionText.isBlank()) {
                        throw new Exception(
                                "Question text is empty"
                        );
                    }

                    if (category.isBlank()) {
                        throw new Exception(
                                "Category is empty"
                        );
                    }

                    if (difficulty.isBlank()) {
                        throw new Exception(
                                "Difficulty is empty"
                        );
                    }

                    if (type.isBlank()) {
                        type = "MCQ";
                    }


                    // -----------------------------------------
                    // NORMALIZE VALUES
                    // -----------------------------------------

                    difficulty =
                            difficulty.trim().toUpperCase();

                    type =
                            type.trim().toUpperCase();

                    correctAnswer =
                            correctAnswer.trim().toUpperCase();


                    // -----------------------------------------
                    // VALIDATE DIFFICULTY
                    // -----------------------------------------

                    if (!difficulty.equals("EASY")
                            && !difficulty.equals("MEDIUM")
                            && !difficulty.equals("HARD")) {

                        throw new Exception(
                                "Invalid difficulty. Use EASY, MEDIUM or HARD."
                        );
                    }


                    // -----------------------------------------
                    // VALIDATE TYPE
                    // -----------------------------------------

                    if (!type.equals("MCQ")
                            && !type.equals("CODING")
                            && !type.equals("DESCRIPTIVE")) {

                        throw new Exception(
                                "Invalid type. Use MCQ, CODING or DESCRIPTIVE."
                        );
                    }


                    // -----------------------------------------
                    // MCQ VALIDATION
                    // -----------------------------------------

                    if (type.equals("MCQ")) {

                        if (optionA.isBlank()
                                || optionB.isBlank()
                                || optionC.isBlank()
                                || optionD.isBlank()) {

                            throw new Exception(
                                    "MCQ must contain options A, B, C and D."
                            );
                        }

                        if (!correctAnswer.equals("A")
                                && !correctAnswer.equals("B")
                                && !correctAnswer.equals("C")
                                && !correctAnswer.equals("D")) {

                            throw new Exception(
                                    "Correct answer must be A, B, C or D."
                            );
                        }

                    } else {

                        // Coding / Descriptive questions
                        optionA = "";
                        optionB = "";
                        optionC = "";
                        optionD = "";
                        correctAnswer = "";
                    }


                    // -----------------------------------------
                    // CREATE QUESTION
                    // -----------------------------------------

                    Question question = new Question();

                    question.setQuestionText(questionText);
                    question.setCategory(category);
                    question.setDifficulty(difficulty);
                    question.setType(type);

                    question.setOptionA(optionA);
                    question.setOptionB(optionB);
                    question.setOptionC(optionC);
                    question.setOptionD(optionD);

                    question.setCorrectAnswer(correctAnswer);
                    question.setExplanation(explanation);


                    // -----------------------------------------
                    // SAVE
                    // -----------------------------------------

                    questionRepository.save(question);

                    imported++;

                } catch (Exception e) {

                    failed++;

                    errors.add(
                            "Row " + rowNumber + ": "
                                    + e.getMessage()
                    );
                }
            }

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(
                            "Failed to read CSV file: "
                                    + e.getMessage()
                    );
        }


        // -----------------------------------------
        // RESPONSE
        // -----------------------------------------

        ImportResponse response =
                new ImportResponse(
                        imported,
                        failed,
                        errors
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // GET CSV VALUE
    // =====================================================

    private String getValue(
            CSVRecord record,
            String columnName
    ) {

        if (!record.isMapped(columnName)) {
            return "";
        }

        String value = record.get(columnName);

        return value == null ? "" : value.trim();
    }


    // =====================================================
    // RESPONSE CLASS
    // =====================================================

    public record ImportResponse(
            int imported,
            int failed,
            List<String> errors
    ) {
    }
}