package com.hu.vaccine.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hu.vaccine.model.Patient;

@SpringBootTest
public class PatientRepositoryTests {
	
	@Autowired
	PatientRepository patientRepository;

	@Test
	void testSave() {
		Patient patient = getPatient(1L);
		patientRepository.save(patient);
		assertEquals(patientRepository.findById(1L).get().getId(), 1);
	}
	
	@Test
	void testFindByAll() {
		patientRepository.save(getPatient(1L));
		patientRepository.save(getPatient(2L));
		assertEquals(patientRepository.findAll().size(), 2);
	}
	
	private Patient getPatient(Long id) {
		Patient patient = new Patient();
		patient.setFirstName("Test");
		patient.setLastName("LastName");
		patient.setDob("01/01/2010");
		patient.setAppointmentDate("01/01/2020");
		patient.setDose("1");
		patient.setId(id);	
		return patient;
	}	
}
