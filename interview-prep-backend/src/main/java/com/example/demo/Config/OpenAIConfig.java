package com.example.demo.Config;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAIConfig {

    @Bean
    public OpenAIClient openAIClient(
            @Value("${GROQ_API_KEY}") String apiKey
    ) {

        return OpenAIOkHttpClient.builder()
                .apiKey(apiKey)
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
    }
}