package com.example.ram.service;



import com.example.ram.model.QueDto;
import com.example.ram.model.Quiz;
import com.example.ram.repository.Questionrepo;
import com.example.ram.repository.Quizrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final Questionrepo questionrepo;

    @Autowired
    public QuestionService(Questionrepo questionrepo) {
        this.questionrepo = questionrepo;
    }

    public void saveQuiz(QueDto queDto) {
        questionrepo.save(queDto);
    }

    public List<QueDto> getAllQuizzes() {
        return questionrepo.findAll();
    }
}
