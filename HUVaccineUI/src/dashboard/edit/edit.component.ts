import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Patient } from "src/model/patient.model";
import { VaccineStateService } from "src/services/vaccine-state.service";
import { VaccineService } from "src/services/vaccine.service";

@Component({
    selector: 'edit-component',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    patient: Patient = new Patient();

    form: FormGroup;

    constructor(private vaccineStateService: VaccineStateService,
        private router: Router,
        private formBuilder: FormBuilder,
        private vaccineService: VaccineService) {

    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            dose: new FormControl('')
        });

        this.vaccineStateService.patient$.subscribe((patient: Patient) => {
            this.patient.id = patient.id;
            this.patient.firstName = patient.firstName;
            this.patient.lastName = patient.lastName;
            this.patient.dob = patient.dob;
            this.patient.dose = patient.dose;
            this.patient.vaccine = patient.vaccine;
            this.patient.appointmentDate = patient.appointmentDate
        });
    }

    submit() {
        const patient = {... this.patient};
        patient.dose = this.form.get('dose').value;
        this.vaccineService.update(patient).subscribe(res => {
            this.router.navigateByUrl('dashboard');
        });        
    }
}