package com.hu.vaccine.login.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hu.vaccine.model.User;

public interface LoginRepository extends JpaRepository<User, Long>{

	User findByUsernameAndPassword(String username, String password);
}
