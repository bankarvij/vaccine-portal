import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Patient } from "src/model/patient.model";
import { VaccineStateService } from "src/services/vaccine-state.service";
import { VaccineService } from "src/services/vaccine.service";
import { DashboardComponent } from "./dashboard.component";

describe('DashboardComponent', () => {

    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;
    let vaccineStateService: VaccineStateService;
    const patientList = [
        {
            id: "1",
            firstName: 'Test1',
            lastName: 'Test2',
            dob: '01/01/2001',
            dose: '1',
            appointmentDate: '04/10/2021',
            vaccine: 'pFizer'
        },
        {
            id: "2",
            firstName: 'Test3',
            lastName: 'Test4',
            dob: '01/01/2001',
            dose: '2',
            appointmentDate: '04/10/2021',
            vaccine: 'Moderna'
        }        
    ] as Patient[];
    const vaccineServiceStub = {
        getPatientList: () => of(patientList),
        update: () => {},
        register: () => {}
    }
    const routerStub = {
        navigateByUrl: () => {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: VaccineService, useValue: vaccineServiceStub },
                VaccineStateService
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vaccineStateService = TestBed.inject(VaccineStateService);
        fixture.detectChanges();
    });

    it ('creates component', () => {
        expect(component).toBeTruthy();
    });

    it ('sets patientList from VaccineService on ngOnInit', () => {
        expect(component.patientList).toBe(patientList);
    });

    it ('filters the list based on text entered', async () => {
        let list: Patient[];
        component.patients$.subscribe(value => list = value)
        component.filter.setValue('Test3');
        fixture.detectChanges();
        await expect(list).toEqual([
            {
                id: '2',
                firstName: 'Test3',
                lastName: 'Test4',
                dob: '01/01/2001',
                dose: '2',
                appointmentDate: '04/10/2021',
                vaccine: 'Moderna'
            } 
        ] as Patient[]);
    });

    it('routes on invocation of edit', () => {
        spyOn(router, 'navigateByUrl');
        component.edit(0);
        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it ('emits patient on invoking edit', async () => {
        let patient: Patient;
        vaccineStateService.patient$.subscribe(pat => patient = pat);
        component.edit(1);
        await expect(patient).toEqual({
            id: '2',
            firstName: 'Test3',
            lastName: 'Test4',
            dob: '01/01/2001',
            dose: '2',
            appointmentDate: '04/10/2021',
            vaccine: 'Moderna'
        } as Patient);
    });
});
