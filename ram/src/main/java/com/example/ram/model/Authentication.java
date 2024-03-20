package com.example.ram.model;

import ch.qos.logback.core.joran.spi.NoAutoStart;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Authentication {

    @Id
    @GeneratedValue
    private Long id;
    private String userName;

    private String emailId;

    private String password;
    private String confPass;

    public Authentication(Long id, String userName, String emailId, String password, String confPass) {
        this.id = id;
        this.userName = userName;
        this.emailId = emailId;
        this.password = password;
        this.confPass = confPass;
    }

    public Authentication() {
    }


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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConfPass() {
        return confPass;
    }

    public void setConfPass(String confPass) {
        this.confPass = confPass;
    }
}
