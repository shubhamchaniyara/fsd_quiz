package com.example.ram.repository;

import com.example.ram.model.Authentication;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Authrepo extends JpaRepository<Authentication, Long> {
    Authentication findByUserName(String userName);
    Authentication findByEmailId(String emailId);
}
