import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "src/model/patient.model";
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class VaccineService {
    header = new HttpHeaders();

    constructor(private http: HttpClient) {
    }

    getPatientList(): Observable<Patient[]> {

        const headers = new HttpHeaders({
            authorization : 'Basic ' + btoa('admin' + ':' + 'vaccine')
        });

        return this.http.get<Patient[]>(environment.url + '/dashboard/list', {headers: headers});
    }

    update(request: Patient) {
        this.header.append('Access-Control-Allow-Origin', '*');
        return this.http.post(environment.url + '/dashboard/update', request,  { headers: this.header    });
    }

    register(request: any) {
        return this.http.post(environment.url + '/dashboard/register', request);
    }
}