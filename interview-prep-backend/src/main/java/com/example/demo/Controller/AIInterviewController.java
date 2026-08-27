package com.example.demo.Controller;

import com.example.demo.DTO.AIInterviewAnswerRequest;
import com.example.demo.DTO.AIInterviewEvaluationResponseDTO;
import com.example.demo.DTO.AIInterviewResponseDTO;
import com.example.demo.DTO.AIInterviewStartRequest;
import com.example.demo.Service.AIInterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai-interview")
@RequiredArgsConstructor
public class AIInterviewController {

    private final AIInterviewService aiInterviewService;


    // =====================================================
    // START AI INTERVIEW
    // =====================================================

    @PostMapping("/start")
    public ResponseEntity<AIInterviewResponseDTO> startInterview(
            @RequestBody AIInterviewStartRequest request
    ) {

        AIInterviewResponseDTO response =
                aiInterviewService.startInterview(request);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // EVALUATE INTERVIEW ANSWER
    // =====================================================

    @PostMapping("/evaluate")
    public ResponseEntity<AIInterviewEvaluationResponseDTO> evaluateAnswer(
            @RequestBody AIInterviewAnswerRequest request
    ) {

        AIInterviewEvaluationResponseDTO response =
                aiInterviewService.evaluateAnswer(request);

        return ResponseEntity.ok(response);
    }
}