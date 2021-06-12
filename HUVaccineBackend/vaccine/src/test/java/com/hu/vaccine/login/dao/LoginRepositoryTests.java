package com.hu.vaccine.login.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hu.vaccine.model.User;

@SpringBootTest
public class LoginRepositoryTests {

	@Autowired
	LoginRepository loginRepository;
	
	@Test
	void testFindByUsernameAndPassword() {
		User obj = new User();
		obj.setUsername("user");
		obj.setPassword("password");
		loginRepository.save(obj);
		User user = loginRepository.findByUsernameAndPassword(obj.getUsername(), obj.getPassword());
		assertEquals(user.getUsername(), obj.getUsername());
		assertEquals(user.getPassword(), obj.getPassword());
	}
}
