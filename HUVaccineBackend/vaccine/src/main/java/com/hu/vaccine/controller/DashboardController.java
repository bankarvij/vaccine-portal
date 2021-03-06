package com.hu.vaccine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hu.vaccine.model.Patient;
import com.hu.vaccine.service.DashboardService;

@CrossOrigin
@RestController
@RequestMapping("/dashboard")
public class DashboardController {
	
	@Autowired
	private DashboardService dashboardService;

	@GetMapping("/list")
	public List<Patient> getPatientList() {
		
		return dashboardService.getPatientList();
	}
	
	@PostMapping("/update")
	public void update(@RequestBody Patient patient) {
		this.dashboardService.update(patient);
	}
	
	@PostMapping("/register")
	public void registerPatient(@RequestBody Patient patient) {
		dashboardService.register(patient);
	}
}
