package com.hu.vaccine.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.hu.vaccine.model.Patient;
import com.hu.vaccine.repository.PatientRepository;

@SpringBootTest
public class DashboardServiceTests {
	
	@MockBean
	PatientRepository patientRepository;
	
	@Autowired
	DashboardService dashboardService;
	
	@Test
	void testGetPatientList() {
		List<Patient> mockList = new ArrayList<>();	
		mockList.add(getPatient(1L));
		
		when(patientRepository.findAll()).thenReturn(mockList);
		
		List<Patient> patientList = dashboardService.getPatientList();
		
		assertEquals(1, patientList.get(0).getId());
		assertEquals("Test", patientList.get(0).getFirstName());
		assertEquals("LastName", patientList.get(0).getLastName());
		
	}	
	
	@Test
	void testGetPatientListSize() {
		List<Patient> mockList = new ArrayList<>();	
		mockList.add(getPatient(1L));
		mockList.add(getPatient(2L));
		
		when(patientRepository.findAll()).thenReturn(mockList);
		
		List<Patient> patientList = dashboardService.getPatientList();
		
		assertEquals(2, patientList.size());
	}
	
	@Test
	void testRegister() {
		Patient mockPatient = getPatient(1L);
		when(patientRepository.save(mockPatient)).thenReturn(mockPatient);
		Patient patient = dashboardService.register(mockPatient);
		assertEquals(patient.getId(), mockPatient.getId());
		
	}
	
	@Test
	void testUpdate() {
		Patient mockPatient = getPatient(2L);
		when(patientRepository.save(mockPatient)).thenReturn(mockPatient);
		Patient patient = dashboardService.update(mockPatient);
		assertEquals(patient.getId(), mockPatient.getId());
		assertEquals(patient.getId(), 2);
	}
	
	private Patient getPatient(Long id) {
		Patient patient = new Patient();
		patient.setFirstName("Test");
		patient.setLastName("LastName");
		patient.setId(id);	
		return patient;
	}
}
