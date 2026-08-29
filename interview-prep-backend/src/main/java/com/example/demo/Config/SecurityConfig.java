package com.example.demo.Config;

import com.example.demo.Filter.JwtAuthFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public SecurityConfig(
            JwtAuthFilter jwtAuthFilter
    ) {

        this.jwtAuthFilter =
                jwtAuthFilter;
    }


    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =================================================
                // CORS
                // =================================================

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )


                // =================================================
                // CSRF
                // =================================================

                .csrf(csrf ->
                        csrf.disable()
                )


                // =================================================
                // SESSION
                // =================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =================================================
                // AUTHORIZATION
                // =================================================

                .authorizeHttpRequests(auth -> auth

                        // -----------------------------------------
                        // LOGIN / REGISTER / OTP
                        // -----------------------------------------

                        .requestMatchers(
                                "/api/auth/**"
                        )
                        .permitAll()


                        // -----------------------------------------
                        // CORS PREFLIGHT
                        // -----------------------------------------

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()


                        // -----------------------------------------
                        // ADMIN APIs
                        // -----------------------------------------

                        .requestMatchers(
                                "/api/admin/**"
                        )
                        .hasRole("ADMIN")


                        // -----------------------------------------
                        // EVERYTHING ELSE
                        // -----------------------------------------

                        .anyRequest()
                        .authenticated()
                )


                // =================================================
                // DISABLE FORM LOGIN
                // =================================================

                .formLogin(form ->
                        form.disable()
                )


                // =================================================
                // DISABLE HTTP BASIC
                // =================================================

                .httpBasic(basic ->
                        basic.disable()
                )


                // =================================================
                // JWT FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =====================================================
    // CORS CONFIGURATION
    // =====================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // =================================================
        // ALLOWED FRONTENDS
        // =================================================

        configuration.setAllowedOrigins(
                List.of(

                        // Local development
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "http://localhost:5175",

                        // Vercel frontend
                        "https://ai-job-interview-platform-lilac.vercel.app",

                        // Render frontend
                        "https://prep-ai-frontend-5h31.onrender.com"
                )
        );


        // =================================================
        // ALLOWED METHODS
        // =================================================

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );


        // =================================================
        // ALLOWED HEADERS
        // =================================================

        configuration.setAllowedHeaders(
                List.of("*")
        );


        // =================================================
        // CREDENTIALS
        // =================================================

        configuration.setAllowCredentials(true);


        // =================================================
        // REGISTER CORS
        // =================================================

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}