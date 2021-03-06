package com.hu.vaccine.controller;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.hu.vaccine.login.LoginController;
import com.hu.vaccine.login.service.LoginService;
import com.hu.vaccine.model.User;

@WebMvcTest(controllers = LoginController.class)
public class LoginControllerTests {
	
	@MockBean
	LoginService loginService;
	
    @Autowired
    private MockMvc mockMvc;
    
	@Test
	void testAuthenticate() throws Exception {
		
		User user = new User();
				
		when(loginService.authenticate(user)).thenReturn(true);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/login")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(getJson())
	            .accept(MediaType.APPLICATION_JSON))
	            .andExpect(MockMvcResultMatchers.status().isOk());
		
	}
	
	@Test
	void testAuthenticateWithoutUserName() throws Exception {
		
		User user = new User();
				
		when(loginService.authenticate(user)).thenReturn(true);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/login")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content("{\\\"username\\\": \\\"\\\", \\\"password\\\": \\\"password\\\"}")
	            .accept(MediaType.APPLICATION_JSON))
	            .andExpect(MockMvcResultMatchers.status().isBadRequest());
		
	}
	
	@Test
	void testAuthenticateWithoutPassword() throws Exception {
		
		User user = new User();
				
		when(loginService.authenticate(user)).thenReturn(true);
		
		mockMvc.perform(MockMvcRequestBuilders.post("/login")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content("{\\\"username\\\": \\\"test1\\\", \\\"password\\\": \\\"\\\"}")
	            .accept(MediaType.APPLICATION_JSON))
	            .andExpect(MockMvcResultMatchers.status().isBadRequest());
		
	}	
	
	private String getJson() {
		return "{\"username\": \"test1\", \"password\": \"password\"}";
	}

}
