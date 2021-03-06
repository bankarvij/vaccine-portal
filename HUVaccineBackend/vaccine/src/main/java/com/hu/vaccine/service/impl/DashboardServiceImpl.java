package com.hu.vaccine.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hu.vaccine.model.Patient;
import com.hu.vaccine.repository.PatientRepository;
import com.hu.vaccine.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {
	
	@Autowired
	private PatientRepository patientRepository;

	@Override
	public Patient register(Patient patient) {
		return patientRepository.save(patient);		
	}

	@Override
	public List<Patient> getPatientList() {
		return patientRepository.findAll();
	}

	@Override
	public Patient update(Patient patient) {
		return patientRepository.save(patient);
	}
	
}
