import { DatePipe } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { of } from "rxjs";
import { VaccineService } from "src/services/vaccine.service";
import { RegisterComponent } from "./register.component";

describe('RegisterComponent', () => {

    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let vaccineService: VaccineService;
    let datePipe: DatePipe;

    const vaccineServiceStub = {
        register: () => of(Boolean)
    }  

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            providers: [
                { provide: VaccineService, useValue: vaccineServiceStub },
                FormBuilder,
                DatePipe
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        vaccineService = TestBed.inject(VaccineService);    
        datePipe = TestBed.inject(DatePipe);
        fixture.detectChanges();
    });

    it ('creates component', () => {
        expect(component).toBeTruthy();
    });

    it ('adds 30 days to appointment date and sets to second dose', async () => {
        component.registerForm.get('appointmentDate').setValue('01/01/2021');
        component.registerForm.get('vaccine').setValue('Moderna');
        fixture.detectChanges();
        await expect(datePipe.transform(component.secondDose, 'MM/dd/yyyy')).toEqual('01/31/2021');
    });

    it ('sets second dose to null if the year is before current year', async () => {
        component.registerForm.get('appointmentDate').setValue('01/01/2019');
        component.registerForm.get('vaccine').setValue('Moderna');
        fixture.detectChanges();
        await expect(component.secondDose).toBeNull();
    });
});