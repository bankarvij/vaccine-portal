import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Patient } from "src/model/patient.model";
import { VaccineStateService } from "src/services/vaccine-state.service";
import { VaccineService } from "src/services/vaccine.service";
import { EditComponent } from "./edit.component";

describe('EditComponent', () => {

    let component: EditComponent;
    let fixture: ComponentFixture<EditComponent>;
    let router: Router;
    let vaccineStateService: VaccineStateService;

    const vaccineServiceStub = {        
        update: () => of([]),        
    }
    const routerStub = {
        navigateByUrl: () => {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditComponent],
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: VaccineService, useValue: vaccineServiceStub },
                VaccineStateService,
                FormBuilder
            ]            
        })
        .compileComponents();

        fixture = TestBed.createComponent(EditComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vaccineStateService = TestBed.inject(VaccineStateService);
    });

    it ('creates component', () => {
        expect(component).toBeTruthy();
    });

    it ('initializes the patient', async () => {
        fixture.detectChanges();
        const patient = {
            id: "2",
            firstName: 'Test3',
            lastName: 'Test4',
            dob: '01/01/2001',
            dose: '2',
            appointmentDate: '04/10/2021',
            vaccine: 'Moderna'
        };
        vaccineStateService.next(patient);
        fixture.detectChanges();
        await expect(component.patient.id).toEqual('2');
    });

    it('routes on invocation of edit', () => {
        spyOn(router, 'navigateByUrl');
        fixture.detectChanges();
        component.form.get('dose').setValue('1');
        component.submit();
        expect(router.navigateByUrl).toHaveBeenCalled();
    });
});