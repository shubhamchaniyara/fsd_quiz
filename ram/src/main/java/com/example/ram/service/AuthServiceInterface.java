package com.example.ram.service;

import com.example.ram.dto.Signupdto;
import org.springframework.stereotype.Service;

public interface AuthServiceInterface {

    Signupdto createUser(Signupdto signupdto);

   Long authenticateLogin(String email, String password);

   Long authenticateSignUp(String email);
}
