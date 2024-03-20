package com.example.ram.dto;

import jakarta.persistence.Column;
import lombok.*;



@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Logindto {


    private String emailId;

    private String password;

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
