package com.hu.vaccine.login.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.hu.vaccine.login.dao.LoginRepository;
import com.hu.vaccine.model.User;

@SpringBootTest
public class LoginServiceTests {
	
	@Autowired
	LoginService loginService;
	
	@MockBean
	LoginRepository loginRepository;
	
	@Test
	void testAuthenticate() {
		User user = new User();
		user.setUsername("test");
		user.setPassword("password");
		when(loginRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword())).thenReturn(user);
		assertEquals(loginService.authenticate(user), true);
	}

	
	@Test
	void testAuthenticateInvalidUser() {
		User user = new User();
		user.setUsername("test");
		user.setPassword("password1");
		when(loginRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword())).thenReturn(null);
		assertEquals(loginService.authenticate(user), false);
	}	
}
