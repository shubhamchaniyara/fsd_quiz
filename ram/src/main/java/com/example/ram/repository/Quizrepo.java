package com.example.ram.repository;

import com.example.ram.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Quizrepo extends JpaRepository<Quiz,Integer> {
}
