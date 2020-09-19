import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/error-snackbar/error-snackbar.component';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/user/user.reducer';
import { UserPageActions } from 'src/app/state/user/actions';
import { getLoginError } from 'src/app/state/user/user.selectors';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TournamentState } from 'src/app/state/tournament/tournament.reducer';
import { GetTournaments } from 'src/app/state/tournament/actions/tournament-api.actions';
import { TournamentAPIActions } from 'src/app/state/tournament/actions';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    public displayLogin = true;
    public providers = AuthProvider;

    public authFormGroup: FormGroup = new FormGroup({
        firstName: new FormControl('Steven',[
            Validators.required,
        ]),
        lastName: new FormControl('Woerpel',[
            Validators.required,
        ]),
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

    private unsubscribe: Subject<void> = new Subject();

    constructor(
        private snackBar: MatSnackBar,
        private userStore: Store<UserState>,
        private tournamentStore: Store<TournamentState>
    ) {}
    ngOnInit(){
        this.userStore.select(getLoginError).pipe(
            takeUntil(this.unsubscribe),
            filter(err => !!err),
            tap(err => this.displaySnackbar(err.code))
        ).subscribe();
        this.tournamentStore.dispatch(TournamentAPIActions.GetTournaments())
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public toggleDisplay(){
        this.displayLogin = !this.displayLogin;
        this.authFormGroup.reset();
    }

    public onSubmit(){

        if(this.displayLogin){
            this.userStore.dispatch(UserPageActions.LoginUser({
                email: this.authFormGroup.controls.email?.value,
                password: this.authFormGroup.controls.password?.value
            }))
        }else{
            this.userStore.dispatch(UserPageActions.RegisterUser({
                firstName: this.authFormGroup.controls.firstName?.value,
                lastName: this.authFormGroup.controls.lastName?.value,
                email: this.authFormGroup.controls.email?.value,
                password: this.authFormGroup.controls.password?.value,
            }))
        }
    }


    private displaySnackbar(error_code) {
        let message = this.displayStrings.unknown;
        if(error_code === 'auth/invalid-email'){
            message = this.displayStrings.invalidEmail;
        }else if(error_code === 'auth/argument-error') {
            message = this.displayStrings.incorrectCredential;
        }else if(error_code === 'auth/wrong-password') {
            message = this.displayStrings.incorrectCredential;
        }else  if(error_code === 'auth/weak-password') {
            message = this.displayStrings.weakPassword;
        }else  if(error_code === 'auth/email-already-in-use') {
            message = this.displayStrings.emailInUse;
        }else{
            message = this.displayStrings.success;
        }
        const snackBarRef = this.snackBar.openFromComponent(SnackbarErrorComponent,{
            data:{
                message: message,
                isSuccess: !error_code,
            }
        });
        setTimeout(() => snackBarRef.dismiss(), 2000);
        
    }
}