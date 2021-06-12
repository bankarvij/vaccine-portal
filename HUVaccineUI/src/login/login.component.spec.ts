import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { LoginService } from "src/services/login.service";
import { LoginComponent } from "./login.component";

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService: LoginService;
    let router: Router;

    const routerStub = {
        navigateByUrl: () => {}
    }    

    const loginServiceStub = {
        authenticate: () => of({result: true})
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: LoginService, useValue: loginServiceStub },
                FormBuilder                
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it ('creates component', () => {
        expect(component).toBeTruthy();
    });

    it ('makes form invalid if the user id is empty', () => {
        component.loginForm.get('username').markAsTouched();
        fixture.detectChanges();
        expect(component.username.invalid).toBeTrue();
    });

    it ('sets error to required if the user id is empty', () => {
        component.loginForm.get('username').markAsTouched();
        fixture.detectChanges();
        expect(component.username.errors.required).toBeTrue();
    });  
    
    it ('makes form invalid if the user id has less than 5 characters', () => {
        component.loginForm.get('username').setValue('abcd')
        fixture.detectChanges();
        expect(component.username.invalid).toBeTrue();
    }); 

    it ('sets error if the user id has less than 5 characters', () => {
        component.loginForm.get('username').setValue('abcd')
        fixture.detectChanges();
        expect(component.username.errors.minlength).toEqual({ requiredLength: 5, actualLength: 4 });
    }); 

    it ('clears error if the user id has more than 4 characters', () => {
        component.loginForm.get('username').setValue('abcdef')
        fixture.detectChanges();
        expect(component.username.errors).toBeNull();
    }); 

    it ('makes form invalid if the password is empty', () => {
        component.loginForm.get('password').markAsTouched();
        fixture.detectChanges();
        expect(component.password.invalid).toBeTrue();
    });

    it ('sets error to required if the password is empty', () => {
        component.loginForm.get('password').markAsTouched();
        fixture.detectChanges();
        expect(component.password.errors.required).toBeTrue();
    });  
    
    it ('makes form invalid if the password has less than 5 characters', () => {
        component.loginForm.get('password').setValue('abcd')
        fixture.detectChanges();
        expect(component.password.invalid).toBeTrue();
    }); 

    it ('sets error if the password has less than 5 characters', () => {
        component.loginForm.get('password').setValue('abcd')
        fixture.detectChanges();
        expect(component.password.errors.minlength).toEqual({ requiredLength: 5, actualLength: 4 });
    }); 

    it ('clears error if the password has more than 4 characters', () => {
        component.loginForm.get('password').setValue('abcdef')
        fixture.detectChanges();
        expect(component.password.errors).toBeNull();
    }); 
});