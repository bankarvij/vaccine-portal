import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VaccineService } from "src/services/vaccine.service";

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [DatePipe]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    secondDose: number;

    register = 'true';

    constructor(private formBuilder: FormBuilder,
        private vaccineService: VaccineService) {

    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            vaccine: ['', [Validators.required]],
            appointmentDate: ['', [Validators.required]]
        });

        this.appointmentDate.valueChanges.subscribe(value => {
            const date: Date = new Date(value);
            if (date.getFullYear() >= (new Date()).getFullYear()) {
                if (this.vaccine.value === 'pFizer') {
                    this.secondDose = date.setDate(date.getDate() + 21);
                } else {
                    this.secondDose = date.setDate(date.getDate() + 30);
                }
            } else {
                this.secondDose = null;
            }
        });
    }

    get vaccine() {
        return this.registerForm.get('vaccine');
    }

    get appointmentDate() {
        return this.registerForm.get('appointmentDate');
    }

    submit() {
        this.vaccineService.register(this.registerForm.value).subscribe(res => {
            this.register = 'false';
        });
    }
}
