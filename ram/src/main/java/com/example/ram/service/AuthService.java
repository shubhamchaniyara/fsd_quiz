package com.example.ram.service;


import com.example.ram.dto.Signupdto;
import com.example.ram.exception.Userexception;
import com.example.ram.model.Authentication;
import com.example.ram.repository.Authrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements AuthServiceInterface{

    @Autowired
    private Authrepo authrepo;

    public AuthService(Authrepo authrepo) {
        this.authrepo = authrepo;
    }

    public AuthService() {
    }

    @Override
    public Signupdto createUser(Signupdto signupdto) {


        // UserDTO  --- Convert--->  UserEntity
        Authentication authentication = new Authentication();
        authentication.setUserName(signupdto.getUserName());
        authentication.setEmailId(signupdto.getEmailId());
       authentication.setPassword(signupdto.getPassword());

        try {

            Authentication savedUserEntity = authrepo.save(authentication);

            // Saved UserEntity --- Convert ---> back to UserDTO
            Signupdto savedUserDTO = new Signupdto();
            savedUserDTO.setUserName(savedUserEntity.getUserName());
            savedUserDTO.setEmailId(savedUserEntity.getEmailId());
            savedUserDTO.setPassword(savedUserEntity.getPassword());

            return savedUserDTO;

        } catch (Exception e) {
            throw new Userexception("Failed to create user", e);
        }
    }

    @Override
    public Long authenticateLogin(String email, String password) {
        System.out.println("inside authenticate login");
        System.out.println(email+password);
        Authentication user = authrepo.findByEmailId(email);
        System.out.println(user);
        return user != null && user.getPassword().equals(password) ? user.getId() : -1;
    }

    @Override
    public Long authenticateSignUp(String email) {
        Authentication user = authrepo.findByEmailId(email);

        return user.getId();
    }
}
