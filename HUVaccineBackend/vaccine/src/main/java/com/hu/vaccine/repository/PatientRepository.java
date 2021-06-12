package com.hu.vaccine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hu.vaccine.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long>{
	
}
