package com.example.ram.controller;

import com.example.ram.dto.Logindto;
import com.example.ram.dto.Signupdto;
import com.example.ram.service.AuthServiceInterface;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Authcontro {

    private final AuthServiceInterface authServiceInterface;

    public Authcontro(AuthServiceInterface authServiceInterface) {
        this.authServiceInterface = authServiceInterface;
        System.out.println("Constructor called");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody Signupdto signupdto) {
        // Check if passwords match
        if (!signupdto.getPassword().equals(signupdto.getConfPass())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords do not match");
        }

        authServiceInterface.createUser(signupdto);

        Long isAuthenticated = authServiceInterface.authenticateSignUp(signupdto.getEmailId());

        System.out.println("Sign up method executed successfully.");
        return new ResponseEntity(isAuthenticated, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Logindto loginDTO) {
        Long isAuthenticated = authServiceInterface.authenticateLogin(loginDTO.getEmailId(), loginDTO.getPassword());

        System.out.println("Login method executed successfully.");

        if (isAuthenticated != -1) {
            return new ResponseEntity(isAuthenticated, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password.");
        }
    }
}
