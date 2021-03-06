package com.hu.vaccine.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hu.vaccine.login.service.LoginService;
import com.hu.vaccine.model.User;

@RestController
public class LoginController {
	
	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public boolean authenticate(@RequestBody User user) {
		return loginService.authenticate(user);
	}
}
