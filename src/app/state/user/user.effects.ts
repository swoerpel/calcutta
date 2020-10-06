import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, take } from 'rxjs/operators';
import { UserAPIActions, UserPageActions } from './actions';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TournamentAPIActions } from '../tournament/actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { UserApiService } from 'src/app/services/user-api.service';
import { User } from 'src/app/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class  UserEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private router: Router,
        private userApiService: UserApiService,
    ){ }

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.LoginUser),
            switchMap((action) => this.userApiService.login(action.email, action.password).pipe(
                switchMap((res: User) => {
                    return[
                        UserAPIActions.LoginUserSuccess({currentUser: {...res}}),
                        TournamentAPIActions.GetTournaments()
                    ]
                }),
                catchError((res) => of(UserAPIActions.LoadUsersError({err: res})))
            )),
            tap(() => this.router.navigate(['/tournament-list'])),
        )
    });

    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.RegisterUser),
            switchMap((action) => this.userApiService.register(
                action.firstName, 
                action.lastName, 
                action.email, 
                action.password
            ).pipe(
                switchMap((newUser: User) => [
                    UserAPIActions.RegisterUserSuccess({currentUser: newUser}),
                    TournamentAPIActions.GetTournaments()
                ]),
                catchError((res) => of(UserAPIActions.LoadUsersError({err: res})))
            )),
            tap(() => this.router.navigate(['/tournament-list'])),
        )
    });

    logoutUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserPageActions.LogoutUser),
            switchMap(() => this.userApiService.logout().pipe(
                map(() => UserAPIActions.LogoutUser()),
                tap(() => this.router.navigate(['/login']))
            ))
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
                return this.userApiService.assignUserPrivileges(action.currentUser.id).pipe(
                    map((isAdmin) => UserAPIActions.AssignUserPrivileges({isAdmin: isAdmin})),
                )
            })
        )
    })


    loadUsers$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            map((action: any) => {
                let url = action?.payload.event.url.split('/');
                url.shift();
                return {baseUrl: url[0], tournamentId: url[1]};
            }),
            // SHOULD BE TURNED ON WHEN NOT DEBUGGING, DEBUG, 
            // NO NEED FOR THIS TO LOAD ON EVERY PAGE
            // filter((routeObj: any) => routeObj.baseUrl === 'tournament-list' && !!routeObj.tournamentId),
            switchMap((routeObj: any) => {
                return this.userApiService.loadUsers().pipe(
                    map((users: User[]) => UserAPIActions.LoadUsersSuccess({allUsers: users})),
                    catchError((err) => of(UserAPIActions.LoadUsersError({err: err})))
                )
            }),
            take(1)
        );   
    });




}