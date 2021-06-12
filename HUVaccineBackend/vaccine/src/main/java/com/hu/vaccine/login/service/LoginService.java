package com.hu.vaccine.login.service;

import com.hu.vaccine.model.User;

public interface LoginService {

	boolean authenticate(User user);
}
