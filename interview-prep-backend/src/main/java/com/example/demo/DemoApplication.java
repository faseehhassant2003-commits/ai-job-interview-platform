package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner generatePasswordHash() {
		return args -> {
			BCryptPasswordEncoder encoder =
					new BCryptPasswordEncoder();

			System.out.println(
					"ADMIN PASSWORD HASH:"
			);

			System.out.println(
					encoder.encode("Admin@1234")
			);
		};
	}
}