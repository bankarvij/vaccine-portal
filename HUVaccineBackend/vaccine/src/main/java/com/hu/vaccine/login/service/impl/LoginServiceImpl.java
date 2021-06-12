package com.hu.vaccine.login.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hu.vaccine.login.dao.LoginRepository;
import com.hu.vaccine.login.service.LoginService;
import com.hu.vaccine.model.User;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginRepository loginRepository;

	@Override
	public boolean authenticate(User user) {
		User obj = this.loginRepository
				.findByUsernameAndPassword(user.getUsername(), user.getPassword());
		return obj != null;
	}

}
