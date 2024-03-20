package com.example.ram.controller;


import com.example.ram.model.QueDto;
import com.example.ram.model.Quiz;
import com.example.ram.service.QuestionService;
import com.example.ram.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class Questioncontro {

    private QuestionService questionService;

    @Autowired
    public Questioncontro(QuestionService questionService) {
        this.questionService = questionService;
    }
    @PostMapping("/question")
    public void saveQuizData(@RequestBody QueDto queDto) {
        questionService.saveQuiz(queDto);
    }

    @GetMapping("/getquestion")
    public List<QueDto> getQuizData() {
        return questionService.getAllQuizzes();
    }
}
