package com.example.demo.Controller;

import com.example.demo.Service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;


    // =====================================================
    // TEST EMAIL
    // =====================================================

    @PostMapping("/test")
    public ResponseEntity<String> sendTestEmail(
            @RequestParam String email
    ) {

        emailService.sendWelcomeEmail(
                email,
                "PrepAI User"
        );

        return ResponseEntity.ok(
                "Test email sent successfully."
        );
    }
}