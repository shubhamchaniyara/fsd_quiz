package com.example.ram.exception;

public class Userexception extends RuntimeException{

    public Userexception(String message) {
        super(message);
    }

    public Userexception(String message, Throwable cause) {
        super(message, cause);
    }
}
