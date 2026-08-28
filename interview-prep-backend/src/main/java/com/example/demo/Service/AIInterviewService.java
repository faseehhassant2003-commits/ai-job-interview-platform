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


        String prompt = """
                You are PrepAI, a professional technical
                interview interviewer.

                Start a technical interview.

                Topic: %s
                Difficulty: %s
                Interview type: %s
                Total questions: %d

                Generate ONE interview question.

                Rules:
                - Ask exactly one question.
                - Do not provide the answer.
                - Do not provide hints.
                - Do not explain the answer.
                - Make it appropriate for the requested
                  difficulty.
                - Make it realistic for a real job interview.
                - Keep it clear and concise.

                Return ONLY the interview question.
                """.formatted(
                topic,
                difficulty,
                interviewType,
                numberOfQuestions
        );


        ResponseCreateParams params =
                ResponseCreateParams.builder()
                        .input(prompt)
                        .model("openai/gpt-oss-20b")
                        .build();


        Response response =
                openAIClient.responses()
                        .create(params);


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


        AIInterviewResponseDTO result =
                new AIInterviewResponseDTO();

        result.setQuestion(
                generatedQuestion
        );

        return result;
    }


    // =====================================================
    // EVALUATE ANSWER + GENERATE FOLLOW-UP
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

        int questionNumber =
                request.getQuestionNumber();

        int totalQuestions =
                request.getTotalQuestions();


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
        // DETERMINE INTERVIEW STAGE
        // =================================================

        boolean lastQuestion =
                questionNumber >= totalQuestions;


        String stageInstruction;


        if (lastQuestion) {

            stageInstruction = """
                    This is the final question of the
                    interview.

                    Do not generate another follow-up
                    question.
                    """;

        } else {

            stageInstruction = """
                    This is not the final question.

                    Based on the candidate's answer,
                    generate ONE relevant follow-up
                    interview question.

                    The follow-up should test deeper
                    understanding of the same topic.

                    Do not simply repeat the previous
                    question.
                    """;
        }


        // =================================================
        // EVALUATION PROMPT
        // =================================================

        String prompt = """
                You are PrepAI, a professional technical
                interviewer and evaluator.

                You are conducting a real technical
                interview.

                Topic:
                %s

                Difficulty:
                %s

                Interview type:
                %s

                Current question:
                %d of %d

                Interview question:
                %s

                Candidate answer:
                %s

                Evaluate the candidate fairly.

                Give a score from 0 to 10.

                Consider:
                - Technical correctness
                - Understanding
                - Completeness
                - Problem solving
                - Clarity

                %s

                Return ONLY valid JSON.

                Use exactly this structure:

                {
                  "score": 0,
                  "feedback": "overall evaluation",
                  "strengths": "what the candidate did well",
                  "improvements": "what the candidate should improve",
                  "idealAnswer": "a strong example answer",
                  "followUpQuestion": "next interview question"
                }

                Rules:
                - score must be an integer from 0 to 10.
                - If the answer is weak, explain what is missing.
                - If the answer is strong, identify what was done well.
                - The follow-up question must be relevant to
                  the candidate's answer.
                - Do not provide the answer to the follow-up
                  question.
                - If this is the final question, set
                  followUpQuestion to an empty string.
                - Do not use markdown.
                - Do not use code fences.
                - Do not add text before the JSON.
                - Do not add text after the JSON.
                """.formatted(
                topic,
                difficulty,
                interviewType,
                questionNumber,
                totalQuestions,
                question,
                answer,
                stageInstruction
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
        // PARSE JSON
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
    // CLEAN JSON
    // =====================================================

    private String cleanJsonResponse(
            String response
    ) {

        if (response == null) {

            return "{}";
        }


        String cleaned =
                response.trim();


        if (cleaned.startsWith("```json")) {

            cleaned =
                    cleaned.substring(7);

        } else if (cleaned.startsWith("```")) {

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