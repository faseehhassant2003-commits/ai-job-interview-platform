package com.example.demo.Service;

import com.example.demo.DTO.AIInterviewAnswerRequest;
import com.example.demo.DTO.AIInterviewEvaluationResponseDTO;
import com.example.demo.DTO.AIInterviewResponseDTO;
import com.example.demo.DTO.AIInterviewStartRequest;
import com.openai.client.OpenAIClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class AIInterviewService {

    private final OpenAIClient openAIClient;

    private final ObjectMapper objectMapper;


    // =====================================================
    // START AI INTERVIEW
    // =====================================================

    public AIInterviewResponseDTO startInterview(
            AIInterviewStartRequest request
    ) {

        String topic =
                request.getTopic();

        String difficulty =
                request.getDifficulty();

        String interviewType =
                request.getInterviewType();

        int numberOfQuestions =
                request.getNumberOfQuestions();


        // =================================================
        // PROMPT
        // =================================================

        String prompt = """
                You are PrepAI, a professional technical
                interview interviewer.

                Start a technical interview for a candidate.

                Topic: %s
                Difficulty: %s
                Interview type: %s
                Number of questions: %d

                Generate ONE interview question.

                Rules:
                - Ask exactly one question.
                - Do not provide the answer.
                - Do not provide hints.
                - Do not explain the answer.
                - Make the question appropriate for the
                  requested difficulty.
                - Make it realistic for a real job interview.
                - Keep it clear and concise.

                Return ONLY the interview question.
                """.formatted(
                topic,
                difficulty,
                interviewType,
                numberOfQuestions
        );


        // =================================================
        // GROQ REQUEST
        // =================================================

        ResponseCreateParams params =
                ResponseCreateParams.builder()
                        .input(prompt)
                        .model("openai/gpt-oss-20b")
                        .build();


        // =================================================
        // CALL GROQ
        // =================================================

        Response response =
                openAIClient.responses()
                        .create(params);


        // =================================================
        // EXTRACT QUESTION
        // =================================================

        String generatedQuestion =
                response.output()
                        .stream()
                        .flatMap(
                                item ->
                                        item.message().stream()
                        )
                        .flatMap(
                                message ->
                                        message.content().stream()
                        )
                        .flatMap(
                                content ->
                                        content.outputText().stream()
                        )
                        .map(
                                outputText ->
                                        outputText.text()
                        )
                        .findFirst()
                        .orElse(
                                "Unable to generate interview question."
                        );


        // =================================================
        // RESPONSE DTO
        // =================================================

        AIInterviewResponseDTO result =
                new AIInterviewResponseDTO();

        result.setQuestion(
                generatedQuestion
        );

        return result;
    }


    // =====================================================
    // EVALUATE INTERVIEW ANSWER
    // =====================================================

    public AIInterviewEvaluationResponseDTO evaluateAnswer(
            AIInterviewAnswerRequest request
    ) {

        String question =
                request.getQuestion();

        String answer =
                request.getAnswer();

        String topic =
                request.getTopic();

        String difficulty =
                request.getDifficulty();

        String interviewType =
                request.getInterviewType();


        // =================================================
        // VALIDATION
        // =================================================

        if (question == null ||
                question.isBlank()) {

            throw new IllegalArgumentException(
                    "Interview question is required."
            );
        }


        if (answer == null ||
                answer.isBlank()) {

            throw new IllegalArgumentException(
                    "Candidate answer is required."
            );
        }


        // =================================================
        // EVALUATION PROMPT
        // =================================================

        String prompt = """
                You are PrepAI, a professional technical
                interview evaluator.

                Evaluate the candidate's answer to the
                interview question.

                Topic: %s
                Difficulty: %s
                Interview type: %s

                Interview Question:
                %s

                Candidate Answer:
                %s

                Evaluate the candidate fairly.

                Give a score from 0 to 10.

                Consider:
                - Technical correctness
                - Understanding of the concept
                - Completeness
                - Problem-solving ability
                - Clarity

                Return ONLY valid JSON.

                Use exactly this structure:

                {
                  "score": 0,
                  "feedback": "overall feedback",
                  "strengths": "what the candidate did well",
                  "improvements": "what the candidate should improve",
                  "idealAnswer": "a strong example answer"
                }

                Important:
                - score must be an integer from 0 to 10.
                - Do not use markdown.
                - Do not use code fences.
                - Do not add text before the JSON.
                - Do not add text after the JSON.
                """.formatted(
                topic,
                difficulty,
                interviewType,
                question,
                answer
        );


        // =================================================
        // CREATE REQUEST
        // =================================================

        ResponseCreateParams params =
                ResponseCreateParams.builder()
                        .input(prompt)
                        .model("openai/gpt-oss-20b")
                        .build();


        // =================================================
        // CALL GROQ
        // =================================================

        Response response =
                openAIClient.responses()
                        .create(params);


        // =================================================
        // EXTRACT AI RESPONSE
        // =================================================

        String evaluationJson =
                response.output()
                        .stream()
                        .flatMap(
                                item ->
                                        item.message().stream()
                        )
                        .flatMap(
                                message ->
                                        message.content().stream()
                        )
                        .flatMap(
                                content ->
                                        content.outputText().stream()
                        )
                        .map(
                                outputText ->
                                        outputText.text()
                        )
                        .findFirst()
                        .orElse("{}");


        // =================================================
        // CLEAN RESPONSE
        // =================================================

        evaluationJson =
                cleanJsonResponse(
                        evaluationJson
                );


        // =================================================
        // CONVERT JSON → DTO
        // =================================================

        try {

            return objectMapper.readValue(
                    evaluationJson,
                    AIInterviewEvaluationResponseDTO.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI evaluation response: "
                            + evaluationJson,
                    e
            );
        }
    }


    // =====================================================
    // CLEAN JSON RESPONSE
    // =====================================================

    private String cleanJsonResponse(
            String response
    ) {

        if (response == null) {

            return "{}";
        }


        String cleaned =
                response.trim();


        // Remove ```json

        if (cleaned.startsWith("```json")) {

            cleaned =
                    cleaned.substring(7);
        }


        // Remove ```

        else if (cleaned.startsWith("```")) {

            cleaned =
                    cleaned.substring(3);
        }


        if (cleaned.endsWith("```")) {

            cleaned =
                    cleaned.substring(
                            0,
                            cleaned.length() - 3
                    );
        }


        return cleaned.trim();
    }
}