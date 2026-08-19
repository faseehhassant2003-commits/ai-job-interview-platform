package com.example.demo.Controller;
import com.example.demo.DTO.UserResponse;
import com.example.demo.Entity.User;
import org.springframework.security.core.Authentication;

import com.example.demo.DTO.AuthResponse;
import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return "User registered successfully";
    }
        @PostMapping("/login")
        public AuthResponse login(@RequestBody LoginRequest request) {
            return authService.login(request);
    }
    @GetMapping("/me")
    public UserResponse getCurrentUser(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

}