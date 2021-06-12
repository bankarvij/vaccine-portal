import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Patient } from "src/model/patient.model";

@Injectable({
    providedIn: 'root'
})
export class VaccineStateService {

    patient$: Observable<Patient>;
    patientSubject: BehaviorSubject<Patient>;

    constructor() {
        this.patientSubject = new BehaviorSubject(new Patient());
        this.patient$ = this.patientSubject.asObservable();
    }

    next(patient: Patient) {
        this.patientSubject.next(patient);
    }
}