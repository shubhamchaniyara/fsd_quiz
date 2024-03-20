package com.example.ram.service;

import com.example.ram.model.Gamepin;
import com.example.ram.model.Quiz;
import com.example.ram.repository.Gamepinrepo;
import com.example.ram.repository.Quizrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final Gamepinrepo gamepinrepo;

    @Autowired
    public GameService(Gamepinrepo gamepinrepo) {
        this.gamepinrepo = gamepinrepo;
    }

    public void saveQuiz(Gamepin gamepin) {
        gamepinrepo.save(gamepin);
    }

    public List<Gamepin> getAllQuizzes() {
        return gamepinrepo.findAll();
    }
}
