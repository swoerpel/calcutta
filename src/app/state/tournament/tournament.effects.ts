import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, filter, withLatestFrom, take } from 'rxjs/operators';
import { of, Observable, from, EMPTY } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { TournamentPageActions,TournamentAPIActions } from './actions';
import { UserAPIActions } from '../user/actions';
import { routerNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { TournamentState } from './tournament.reducer';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class TournamentEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private db: AngularFirestore,
        private tournamentStore: Store<TournamentState>,
        private router: Router,
    ){ 
 
    }

    getTournaments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            filter((action: any) => action?.payload.event.url === '/tournament-list'),
            switchMap((action) => {
                    return this.db.collection<any>('tournaments').get().pipe(
                    map((res) => {
                        let tournamentList = [];
                        res.forEach(d => {
                            tournamentList.push({
                                ...d.data(),
                                id: d.id,
                            })
                        });
                        return TournamentAPIActions.GetTournamentsSuccess({tournamentList: tournamentList})
                    }),
                    catchError((err) => {
                        this.tournamentStore.dispatch(TournamentAPIActions.GetTournamentsError({err: err}))
                        return EMPTY;
                    })
                )
            }),
            take(1),
        )   
    });

    // openTournament$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(TournamentPageActions.OpenTournament),
    //         tap((action) => )
    //         switchMap((action) => {
    //             return of()

    //         }),

    //     )
    // })

    // // not needed
    // createTournaments$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(TournamentPageActions.CreateTournament),
    //         switchMap((action) => ),
    //     )   
    // });
}