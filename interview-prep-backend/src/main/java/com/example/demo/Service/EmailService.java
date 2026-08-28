package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private static final String BREVO_API_URL =
            "https://api.brevo.com/v3/smtp/email";

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.from.email}")
    private String fromEmail;

    @Value("${brevo.from.name}")
    private String fromName;


    // =====================================================
    // SEND EMAIL
    // =====================================================

    public void sendEmail(
            String toEmail,
            String toName,
            String subject,
            String htmlContent
    ) {

        RestTemplate restTemplate =
                new RestTemplate();


        // =================================================
        // HEADERS
        // =================================================

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "api-key",
                brevoApiKey
        );


        // =================================================
        // SENDER
        // =================================================

        Map<String, String> sender =
                new HashMap<>();

        sender.put(
                "name",
                fromName
        );

        sender.put(
                "email",
                fromEmail
        );


        // =================================================
        // RECIPIENT
        // =================================================

        Map<String, String> recipient =
                new HashMap<>();

        recipient.put(
                "email",
                toEmail
        );

        if (
                toName != null &&
                        !toName.isBlank()
        ) {

            recipient.put(
                    "name",
                    toName
            );
        }


        // =================================================
        // REQUEST BODY
        // =================================================

        Map<String, Object> body =
                new HashMap<>();

        body.put(
                "sender",
                sender
        );

        body.put(
                "to",
                List.of(recipient)
        );

        body.put(
                "subject",
                subject
        );

        body.put(
                "htmlContent",
                htmlContent
        );


        // =================================================
        // REQUEST
        // =================================================

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(
                        body,
                        headers
                );


        // =================================================
        // SEND
        // =================================================

        restTemplate.postForEntity(
                BREVO_API_URL,
                request,
                String.class
        );
    }


    // =====================================================
    // WELCOME EMAIL
    // =====================================================

    public void sendWelcomeEmail(
            String email,
            String name
    ) {

        String html = """
                <!DOCTYPE html>
                <html>
                <body style="
                    font-family: Arial, sans-serif;
                    background-color: #f5f7fb;
                    padding: 40px;
                ">

                    <div style="
                        max-width: 600px;
                        margin: auto;
                        background: white;
                        padding: 35px;
                        border-radius: 12px;
                    ">

                        <h1 style="margin-bottom: 10px;">
                            Welcome to PrepAI 🤖
                        </h1>

                        <p>
                            Hello %s,
                        </p>

                        <p>
                            Welcome to PrepAI — your AI-powered
                            technical interview preparation platform.
                        </p>

                        <p>
                            You can now practice technical
                            interviews, receive AI feedback,
                            and improve your interview skills.
                        </p>

                        <p>
                            Good luck with your preparation!
                        </p>

                        <strong>
                            — Team PrepAI
                        </strong>

                    </div>

                </body>
                </html>
                """.formatted(
                escapeHtml(name)
        );


        sendEmail(
                email,
                name,
                "Welcome to PrepAI 🤖",
                html
        );
    }


    // =====================================================
    // INTERVIEW RESULT EMAIL
    // =====================================================

    public void sendInterviewResultEmail(
            String email,
            String name,
            String topic,
            String difficulty,
            double score
    ) {

        String html = """
                <!DOCTYPE html>
                <html>
                <body style="
                    font-family: Arial, sans-serif;
                    background-color: #f5f7fb;
                    padding: 40px;
                ">

                    <div style="
                        max-width: 600px;
                        margin: auto;
                        background: white;
                        padding: 35px;
                        border-radius: 12px;
                    ">

                        <h1>
                            AI Interview Completed 🎉
                        </h1>

                        <p>
                            Hello %s,
                        </p>

                        <p>
                            You have completed your PrepAI
                            interview.
                        </p>

                        <hr>

                        <p>
                            <strong>Topic:</strong> %s
                        </p>

                        <p>
                            <strong>Difficulty:</strong> %s
                        </p>

                        <p>
                            <strong>Score:</strong> %.1f / 10
                        </p>

                        <hr>

                        <p>
                            Keep practicing and improve your
                            interview performance with PrepAI.
                        </p>

                        <strong>
                            — Team PrepAI
                        </strong>

                    </div>

                </body>
                </html>
                """.formatted(
                escapeHtml(name),
                escapeHtml(topic),
                escapeHtml(difficulty),
                score
        );


        sendEmail(
                email,
                name,
                "Your PrepAI Interview Result",
                html
        );
    }
    // =====================================================
// VERIFICATION OTP EMAIL
// =====================================================

    public void sendVerificationOtpEmail(
            String email,
            String name,
            String otp
    ) {

        String html = """
            <!DOCTYPE html>
            <html>

            <body style="
                margin: 0;
                padding: 40px;
                background-color: #f5f7fb;
                font-family: Arial, sans-serif;
            ">

                <div style="
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    text-align: center;
                ">

                    <h1 style="
                        color: #17213a;
                        margin-bottom: 10px;
                    ">
                        Welcome to PrepAI 🤖
                    </h1>

                    <p style="
                        color: #555;
                        font-size: 16px;
                    ">
                        Hello %s,
                    </p>

                    <p style="
                        color: #555;
                        font-size: 16px;
                    ">
                        Please use the OTP below to verify
                        your email address.
                    </p>

                    <div style="
                        margin: 30px 0;
                        padding: 20px;
                        background-color: #eef8f3;
                        border-radius: 12px;
                    ">

                        <div style="
                            font-size: 36px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            color: #168b58;
                        ">
                            %s
                        </div>

                    </div>

                    <p style="
                        color: #777;
                        font-size: 14px;
                    ">
                        This OTP is valid for 5 minutes.
                    </p>

                    <p style="
                        color: #777;
                        font-size: 14px;
                    ">
                        If you did not create a PrepAI account,
                        you can ignore this email.
                    </p>

                    <hr style="
                        border: none;
                        border-top: 1px solid #eee;
                        margin: 30px 0;
                    ">

                    <p style="
                        color: #17213a;
                        font-weight: bold;
                    ">
                        — Team PrepAI
                    </p>

                </div>

            </body>

            </html>
            """.formatted(
                escapeHtml(name),
                escapeHtml(otp)
        );


        sendEmail(
                email,
                name,
                "Your PrepAI Verification Code",
                html
        );
    }


    // =====================================================
    // HTML ESCAPE
    // =====================================================

    private String escapeHtml(
            String value
    ) {

        if (value == null) {
            return "";
        }

        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}