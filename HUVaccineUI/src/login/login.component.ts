import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/services/login.service";

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMsg: string;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });        
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }

    submit() {
        this.loginService.authenticate(this.loginForm.value).subscribe(res => {
            if (res) {
                this.router.navigateByUrl('dashboard');
            } else {
                this.errorMsg = "Invalid User Id or Password";
            }
        });
        
    }
}