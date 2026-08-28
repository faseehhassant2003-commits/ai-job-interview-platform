package com.example.demo.Controller;

import com.example.demo.DTO.UserResponse;
import com.example.demo.Entity.User;
import com.example.demo.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody com.example.demo.DTO.RegisterRequest request
    ) {

        authService.register(request);

        return ResponseEntity.ok(
                "Registration successful. OTP sent to your email."
        );
    }


    // =====================================================
    // VERIFY OTP
    // =====================================================

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp
    ) {

        authService.verifyOtp(
                email,
                otp
        );

        return ResponseEntity.ok(
                "Email verified successfully."
        );
    }


    // =====================================================
    // RESEND OTP
    // =====================================================

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(
            @RequestParam String email
    ) {

        authService.resendOtp(email);

        return ResponseEntity.ok(
                "A new OTP has been sent to your email."
        );
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public com.example.demo.DTO.AuthResponse login(
            @RequestBody com.example.demo.DTO.LoginRequest request
    ) {

        return authService.login(request);
    }


    // =====================================================
    // CURRENT USER
    // =====================================================

    @GetMapping("/me")
    public UserResponse getCurrentUser(
            Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}