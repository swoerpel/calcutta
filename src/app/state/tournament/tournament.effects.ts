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
import { INIT, Store } from '@ngrx/store';

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
            ofType(ROUTER_NAVIGATED,INIT),
            // filter((action: any) => action?.payload.event.url === '/tournament-list'),
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

    resetCurrentTournament$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            filter((action: any) => action?.payload.event.url === '/create-tournament/new-tournament'),
            switchMap(() => {
                return of(TournamentAPIActions.ResetCurrentTournament())
            }),
        )   
    });

    setCurrentTournament$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED,INIT),
            map((action: any) => action?.payload.event.url.split('/')),
            filter((url: any) => {
                url.shift();
                return(url[0] === 'create-tournament' && url[1] !== 'new-tournament')
            }),
            switchMap((url) => {
                return of(TournamentAPIActions.SetCurrentTournament({tournamentId: url[1]}))
            }),
        )   
    });

    // will need update still
    createAndUpdateTournament$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TournamentPageActions.CreateTournament, TournamentPageActions.UpdateTournament),
            switchMap((cuPayload) => {
                if(cuPayload.type === TournamentPageActions.UpdateTournament.type){
                    return from(this.db.collection<any>('tournaments').doc(cuPayload.tournament.id).update(cuPayload.tournament)).pipe(
                        map(() => {
                            return TournamentAPIActions.UpdateTournamentSuccess({tournament: {
                                ...cuPayload.tournament,
                            }})
                        }),
                        catchError(err => of(TournamentAPIActions.UpdateTournamentError({err: err})))
                    )
                }else{
                    return from(this.db.collection<any>('tournaments').add(cuPayload.tournament)).pipe(
                        map((res) => {
                            return TournamentAPIActions.CreateTournamentSuccess({tournament: {
                                ...cuPayload.tournament,
                                id:res.id
                            }})
                        }),
                        catchError(err => of(TournamentAPIActions.CreateTournamentError({err: err})))
                    )
                }

            }),

        )
    })


}