package com.example.ram.repository;

import com.example.ram.model.Gamepin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Gamepinrepo extends JpaRepository<Gamepin,Integer> {
}
