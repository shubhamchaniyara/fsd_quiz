package com.example.ram.exception;

public class Authexception extends RuntimeException {

    public Authexception(String message) {
        super(message);
    }

    public Authexception(String message, Throwable cause) {
        super(message, cause);
    }
}
