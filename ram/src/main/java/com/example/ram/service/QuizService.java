package com.example.ram.service;

import com.example.ram.model.Quiz;
import com.example.ram.repository.Quizrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    private final Quizrepo quizRepository;

    @Autowired
    public QuizService(Quizrepo quizRepository) {
        this.quizRepository = quizRepository;
    }

    public void saveQuiz(Quiz quiz) {
        quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }


    public Quiz getUserQuiz(Integer id) {
        Optional<Quiz> quizOptional = quizRepository.findById(id);
        return quizOptional.orElse(null);
    }
}
