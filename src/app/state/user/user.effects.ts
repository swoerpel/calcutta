import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import { UserAPIActions, UserPageActions } from './actions';
import { of, Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TournamentAPIActions } from '../tournament/actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { UserState } from './user.reducer';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class  UserEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private firebaseAuth: AngularFireAuth,
        private router: Router,
        private db: AngularFirestore,
        private userStore: Store<UserState>,
    ){ }

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.LoginUser),
            switchMap((action) => from(this.firebaseAuth.signInWithEmailAndPassword(action.email, action.password))),
            switchMap((authResponse) => {
                return [
                    UserAPIActions.LoginUserSuccess({user: {
                        uid: authResponse.user.uid,
                        displayName: authResponse.user.displayName,
                        email: authResponse.user.email,
                    }}),
                    TournamentAPIActions.GetTournaments()
                ]
            }),
            tap(() => this.router.navigate(['/tournament-list'])),
        )
    });


    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.RegisterUser),
            switchMap(
                (action) => from(
                    this.firebaseAuth.createUserWithEmailAndPassword(action.email, action.password)
                ).pipe(
                    map((authResponse) => {
                        let displayName = action.firstName + '_' + action.lastName;
                        authResponse.user.updateProfile({
                            displayName: action.firstName + '_' + action.lastName
                        })
                        return UserAPIActions.RegisterUserSuccess({user: {
                            uid: authResponse.user.uid,
                            displayName: displayName,
                            email: authResponse.user.email,
                        }})
                    }),
                    catchError((err) => of(UserAPIActions.RegisterUserError({err: err.Message})))
                )
            ),
            tap(() => this.router.navigate(['/tournament-list'])),
        )
    });

    logoutUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.LogoutUser),
            switchMap(() => {
                this.firebaseAuth.signOut();
                return of(UserAPIActions.LogoutUser())
            }),
            tap(() => this.router.navigate(['/login']))
        )
    });

    assignUserPrivileges$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                UserAPIActions.LoginUserSuccess, 
                UserAPIActions.RegisterUserSuccess,
                // ROUTER_NAVIGATED,
            ),
            switchMap((action) => {
                console.log("action",action)
                return this.db.collection<any>('private').doc('roles').get().pipe(
                    map((res) => {
                        return UserAPIActions.AssignUserPrivileges({
                            isAdmin: Object.keys(res.data()).includes(action.user.uid)
                        })
                    })
                )
            })

        )
    })



}