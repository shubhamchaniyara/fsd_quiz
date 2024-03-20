package com.example.ram.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity(name="pin")
public class Gamepin {

    @Id
    @GeneratedValue
    private Integer id;

    private Long gamepin;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Long getGamepin() {
        return gamepin;
    }

    public void setGamepin(Long gamepin) {
        this.gamepin = gamepin;
    }
}
