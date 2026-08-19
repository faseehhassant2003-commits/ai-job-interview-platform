package com.example.demo.DTO;

import lombok.Data;

import java.security.PrivateKey;

@Data
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
}
