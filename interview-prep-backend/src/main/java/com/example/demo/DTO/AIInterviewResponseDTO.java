package com.example.demo.DTO;

public class AIInterviewResponseDTO {

    private String question;

    private String feedback;

    private int technicalAccuracy;

    private int completeness;

    private int communication;

    private int overallScore;

    private String nextQuestion;


    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }


    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }


    public int getTechnicalAccuracy() {
        return technicalAccuracy;
    }

    public void setTechnicalAccuracy(int technicalAccuracy) {
        this.technicalAccuracy = technicalAccuracy;
    }


    public int getCompleteness() {
        return completeness;
    }

    public void setCompleteness(int completeness) {
        this.completeness = completeness;
    }


    public int getCommunication() {
        return communication;
    }

    public void setCommunication(int communication) {
        this.communication = communication;
    }


    public int getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(int overallScore) {
        this.overallScore = overallScore;
    }


    public String getNextQuestion() {
        return nextQuestion;
    }

    public void setNextQuestion(String nextQuestion) {
        this.nextQuestion = nextQuestion;
    }
}