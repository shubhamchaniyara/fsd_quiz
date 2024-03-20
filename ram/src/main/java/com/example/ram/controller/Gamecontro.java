package com.example.ram.controller;


import com.example.ram.model.Gamepin;
import com.example.ram.model.Quiz;
import com.example.ram.service.GameService;
import com.example.ram.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class Gamecontro {

    private GameService gameService;

    @Autowired
    public Gamecontro(GameService gameService) {
        this.gameService = gameService;
    }
    @PostMapping("/gpin")
    public void saveQuizData(@RequestBody Gamepin gamepin) {
        gameService.saveQuiz(gamepin);
    }

    @GetMapping("/getpin")
    public List<Gamepin> getQuizData() {
        return gameService.getAllQuizzes();
    }

}
