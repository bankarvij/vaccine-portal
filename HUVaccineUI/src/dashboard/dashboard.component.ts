import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { Patient } from "src/model/patient.model";
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { VaccineStateService } from "src/services/vaccine-state.service";
import { VaccineService } from "src/services/vaccine.service";

@Component({
    selector: 'app-dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    patientList: Patient[] = []
       

    patients$: Observable<Patient[]>;

    filter = new FormControl('');

    page = 1;
    pageSize = 4;
    collectionSize = this.patientList.length;    

    constructor(private router: Router,
        private vaccineStateService: VaccineStateService,
        private vaccineService: VaccineService) {
    }

    ngOnInit() {
        this.vaccineService.getPatientList().subscribe(res => {
            console.log(res);
            this.patientList = res;
            this.patients$ = this.filter.valueChanges.pipe(
                startWith(''),
                map(text => this.search(text))
            );
        });
    }

    search(text: string): Patient[] {
        return this.patientList.filter(patient => {
          const term = text.toLowerCase();
          return patient.firstName.toLowerCase().includes(term)
              || patient.lastName.toLowerCase().includes(term)
              || patient.dob.toLowerCase().includes(term)
              || patient.vaccine.toLowerCase().includes(term)
              || patient.dose.toLowerCase().includes(term)
        });
    }

    edit(patientIndex: number) {
        this.vaccineStateService.next({
            id: this.patientList[patientIndex].id,
            firstName: this.patientList[patientIndex].firstName,
            lastName: this.patientList[patientIndex].lastName,
            dob: this.patientList[patientIndex].dob,
            vaccine: this.patientList[patientIndex].vaccine,
            dose: this.patientList[patientIndex].dose,
            appointmentDate: this.patientList[patientIndex].appointmentDate
        });
        this.router.navigateByUrl('dashboard/edit');
    }

}
