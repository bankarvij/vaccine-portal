package com.hu.vaccine.controller;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;

import com.hu.vaccine.model.Patient;
import com.hu.vaccine.service.DashboardService;

@WebMvcTest(controllers = DashboardController.class)
public class DashboardControllerTests {

	@MockBean
	DashboardService dashboardService;
	
    @Autowired
    private MockMvc mockMvc;	
	
	@Test
	void testGetPatientList() throws Exception {
		List<Patient> mockList = new ArrayList<>();	
		mockList.add(getPatient(1L));
		mockList.add(getPatient(2L));
				
		when(dashboardService.getPatientList()).thenReturn(mockList);
		
		mockMvc.perform(MockMvcRequestBuilders.get("/dashboard/list").accept(MediaType.ALL))
			.andExpect(MockMvcResultMatchers.status().is(200))
			.andExpect(jsonPath("$[0].id", is(1)))
			.andExpect(jsonPath("$[1].id", is(2)));
		
	}
	
	@Test
	void testUpdate() throws Exception {
				
		when(dashboardService.update(getPatient(1L))).thenReturn(getPatient(1L));
		
		mockMvc.perform(MockMvcRequestBuilders.post("/dashboard/update")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(getJson())
	            .accept(MediaType.APPLICATION_JSON))
	            .andExpect(MockMvcResultMatchers.status().isOk());
		
	}
	
	@Test
	void testRegister() throws Exception {
		
		when(dashboardService.register(getPatient(1L))).thenReturn(getPatient(1L));
		
		mockMvc.perform(MockMvcRequestBuilders.post("/dashboard/register")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(getJson())
	            .accept(MediaType.APPLICATION_JSON))
	            .andExpect(MockMvcResultMatchers.status().isOk());
		
	}	
	
	private Patient getPatient(Long id) {
		Patient patient = new Patient();
		patient.setFirstName("Test");
		patient.setLastName("LastName");
		patient.setId(id);	
		return patient;
	}	
	
	private String getJson() {
		return "{"
				+ "	\"firstName\": \"Rajeshwar\",\r\n"
				+ "	\"lastName\": \"Madugula\",\r\n"
				+ "	\"dob\": \"04/10/1982\",\r\n"
				+ "	\"vaccine\": \"pFizer\",\r\n"
				+ "	\"appointmentDate\": \"10/10/2021\",\r\n"
				+ "	\"dose\": \"1\"\r\n"
				+ "}";
	}

	
}
