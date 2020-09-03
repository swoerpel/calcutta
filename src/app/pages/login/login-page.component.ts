import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SnackbarErrorComponent } from 'src/app/shared/error-snackbar/error-snackbar.component';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    public displayLogin = true;
    public providers = AuthProvider;

    public authFormGroup: FormGroup = new FormGroup({
        email: new FormControl('steve.woerpel@gmail.com',[
            Validators.required,
        ]),
        password: new FormControl('swoerpel',[
            Validators.required,
        ]),
        passwordRepeat: new FormControl('', [
            Validators.required,
        ]),
    });

    private displayStrings = {
        invalidEmail: 'Email is invalid',
        incorrectCredential: 'Email or Password is invalid',
        emailInUse: 'Email already being used',
        unknown: 'An error occured',
        weakPassword: 'password should be at least 6 characters',
        success: 'Success',
    }

    constructor(
        private router: Router,
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) {}
    ngOnInit(){
    }

    public onLogin($event){
        this.router.navigate(['/tournament-list']);
    }

    public toggleDisplay(){
        this.displayLogin = !this.displayLogin;
        this.authFormGroup.reset();
    }

    public onSubmit(){
        if(this.displayLogin){
            this.auth.login(
                this.authFormGroup.controls.email.value,
                this.authFormGroup.controls.password.value
            ).pipe(
                tap(res => {
                    this.displaySnackbar(res);
                    this.router.navigate(['/tournament-list']);
                }),
                catchError(err => {
                    this.displaySnackbar(err);
                    return throwError(err);
                })
            ).subscribe();
        }else{
            this.auth.register(
                this.authFormGroup.controls.email.value,
                this.authFormGroup.controls.password.value
            ).pipe(
                tap(res => {
                    this.displaySnackbar(res);
                    this.router.navigate(['/tournament-list']);
                }),
                catchError(err => {
                    this.displaySnackbar(err);
                    return throwError(err);
                })
            ).subscribe();
        }
    }


    private displaySnackbar(event) {
        let message = this.displayStrings.unknown;
        if(event.code === 'auth/invalid-email'){
            message = this.displayStrings.invalidEmail;
        }else if(event.code === 'auth/argument-error') {
            message = this.displayStrings.incorrectCredential;
        }else if(event.code === 'auth/wrong-password') {
            message = this.displayStrings.incorrectCredential;
        }else  if(event.code === 'auth/weak-password') {
            message = this.displayStrings.weakPassword;
        }else  if(event.code === 'auth/email-already-in-use') {
            message = this.displayStrings.emailInUse;
        }else if(event?.user){
            message = this.displayStrings.success;
        }
        const snackBarRef = this.snackBar.openFromComponent(SnackbarErrorComponent,{
            data:{
                message: message,
                isSuccess: !event.code,
            }
        });
        setTimeout(() => snackBarRef.dismiss(), 2000);
        
    }
}