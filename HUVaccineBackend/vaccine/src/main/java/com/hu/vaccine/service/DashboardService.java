package com.hu.vaccine.service;

import java.util.List;

import com.hu.vaccine.model.Patient;

public interface DashboardService {

	List<Patient> getPatientList();
	Patient register(Patient patient);
	Patient update(Patient patient);
}
