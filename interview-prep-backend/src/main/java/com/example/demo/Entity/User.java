package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "USER";

    // ==========================================
    // EMAIL VERIFICATION
    // ==========================================

    @Column
    private Boolean emailVerified = false;

    @Column
    private String verificationOtp;

    @Column
    private LocalDateTime otpExpiry;
}