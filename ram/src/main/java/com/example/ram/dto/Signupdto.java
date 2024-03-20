package com.example.ram.dto;

import lombok.*;
@ToString
public class Signupdto {
    private String userName;
    private String emailId;
    private String password;
    private String confPass;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

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

    public String getConfPass() {
        return confPass;
    }

    public void setConfPass(String confPass) {
        this.confPass = confPass;
    }

    public Signupdto(String userName, String emailId, String password, String confPass) {
        this.userName = userName;
        this.emailId = emailId;
        this.password = password;
        this.confPass = confPass;
    }

    public Signupdto() {
    }
}
