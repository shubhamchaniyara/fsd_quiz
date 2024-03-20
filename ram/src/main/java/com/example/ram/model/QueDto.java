package com.example.ram.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity(name = "question")
public class QueDto {

    @Id
    @GeneratedValue
    private Integer id;
    private String question;
    private String correctAnswer;
    private String option_a;

    private String option_b;

    private String option_c;

    private String option_d;

    private String option_e;

    private String option_f;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getOption_a() {
        return option_a;
    }

    public void setOption_a(String option_a) {
        this.option_a = option_a;
    }

    public String getOption_b() {
        return option_b;
    }

    public void setOption_b(String option_b) {
        this.option_b = option_b;
    }

    public String getOption_c() {
        return option_c;
    }

    public void setOption_c(String option_c) {
        this.option_c = option_c;
    }

    public String getOption_d() {
        return option_d;
    }

    public void setOption_d(String option_d) {
        this.option_d = option_d;
    }

    public String getOption_e() {
        return option_e;
    }

    public void setOption_e(String option_e) {
        this.option_e = option_e;
    }

    public String getOption_f() {
        return option_f;
    }

    public void setOption_f(String option_f) {
        this.option_f = option_f;
    }
}
