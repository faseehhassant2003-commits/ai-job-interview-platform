package com.example.demo.Service;

import com.example.demo.DTO.AuthResponse;
import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    private final SecureRandom secureRandom =
            new SecureRandom();


    // =====================================================
    // REGISTER
    // =====================================================

    public User register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }


        User user = new User();

        user.setName(request.getName());

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole("USER");

        // New account is NOT verified yet
        user.setEmailVerified(false);


        // Generate OTP
        String otp = generateOtp();

        user.setVerificationOtp(otp);

        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5)
        );


        // Save user
        User savedUser =
                userRepository.save(user);


        // Send OTP email
        emailService.sendVerificationOtpEmail(
                savedUser.getEmail(),
                savedUser.getName(),
                otp
        );


        return savedUser;
    }


    // =====================================================
    // GENERATE OTP
    // =====================================================

    private String generateOtp() {

        int number =
                secureRandom.nextInt(900000) + 100000;

        return String.valueOf(number);
    }


    // =====================================================
    // VERIFY OTP
    // =====================================================

    public void verifyOtp(
            String email,
            String otp
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        // Already verified
        if (Boolean.TRUE.equals(
                user.getEmailVerified()
        )) {

            throw new RuntimeException(
                    "Email is already verified"
            );
        }


        // Check OTP
        if (
                user.getVerificationOtp() == null ||
                        !user.getVerificationOtp().equals(otp)
        ) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }


        // Check expiry
        if (
                user.getOtpExpiry() == null ||
                        LocalDateTime.now()
                                .isAfter(user.getOtpExpiry())
        ) {

            throw new RuntimeException(
                    "OTP has expired. Please request a new OTP."
            );
        }


        // Verify user
        user.setEmailVerified(true);

        user.setVerificationOtp(null);

        user.setOtpExpiry(null);


        userRepository.save(user);
    }


    // =====================================================
    // RESEND OTP
    // =====================================================

    public void resendOtp(
            String email
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        if (Boolean.TRUE.equals(
                user.getEmailVerified()
        )) {

            throw new RuntimeException(
                    "Email is already verified"
            );
        }


        String otp =
                generateOtp();


        user.setVerificationOtp(otp);

        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5)
        );


        userRepository.save(user);


        emailService.sendVerificationOtpEmail(
                user.getEmail(),
                user.getName(),
                otp
        );
    }


    // =====================================================
    // LOGIN
    // =====================================================

    public AuthResponse login(
            LoginRequest request
    ) {

        User user =
                userRepository.findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );


        // ================================================
        // EMAIL VERIFICATION CHECK
        // ================================================

        if (
                Boolean.FALSE.equals(
                        user.getEmailVerified()
                )
        ) {

            throw new RuntimeException(
                    "Please verify your email before logging in."
            );
        }


        // ================================================
        // PASSWORD
        // ================================================

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        // ================================================
        // JWT
        // ================================================

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );


        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}