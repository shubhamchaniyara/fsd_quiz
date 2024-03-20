package com.example.ram.repository;

import com.example.ram.model.QueDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Questionrepo extends JpaRepository<QueDto,Integer> {
}
