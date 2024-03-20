package com.example.ram.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity(name="nickname")
public class Quiz {

    @Id
    @GeneratedValue
    private Integer Id;

    private Long gamepin;
    private  String nickname;

    private Integer score;

    public Long getGamepin() {
        return gamepin;
    }

    public void setGamepin(Long gamepin) {
        this.gamepin = gamepin;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
