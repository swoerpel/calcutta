import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, filter, withLatestFrom, take } from 'rxjs/operators';
import { of, Observable, from, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { TournamentPageActions,TournamentAPIActions } from './actions';
import { UserAPIActions } from '../user/actions';
import { routerNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { TournamentState } from './tournament.reducer';
import { INIT, Store } from '@ngrx/store';
import { TournamentApiService } from 'src/app/services/tournament-api.service';
import { Tournament } from 'src/app/models/tournament.model';

@Injectable({
    providedIn: 'root'
})
export class TournamentEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private tournamentApiService: TournamentApiService,
        private tournamentStore: Store<TournamentState>,
        private router: Router,
    ){ 
 
    }

    getTournaments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED,INIT),
            // filter((action: any) => action?.payload.event.url === '/tournament-list'),
            switchMap((action) => {
                    return this.tournamentApiService.getTournaments().pipe(
                    map((tournamentList: Tournament[]) => TournamentAPIActions.GetTournamentsSuccess({tournamentList: tournamentList})),
                    catchError((err) => {
                        this.tournamentStore.dispatch(TournamentAPIActions.GetTournamentsError({err: err}))
                        return EMPTY;
                    })
                )
            }),
            take(1),
        )   
    });

    deleteTournament$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TournamentPageActions.DeleteTournament),
            switchMap((action) => {
                    return this.tournamentApiService.deleteTournament(action.tournamentId).pipe(
                        map(() => {
                            this.router.navigate(['/tournament-list']);
                            return TournamentAPIActions.DeleteTournamentSuccess({tournamentId: action.tournamentId})
                        }),
                        catchError((err) => of(TournamentAPIActions.DeleteTournamentError({err: err})))
                )
            }),
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

    createAndUpdateTournament$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TournamentPageActions.CreateTournament, TournamentPageActions.UpdateTournament),
            switchMap((cuPayload) => {
                this.router.navigate(['/tournament-list']);
                if(cuPayload.type === TournamentPageActions.UpdateTournament.type){
                    return this.tournamentApiService.updateTournament(cuPayload.tournament).pipe(
                        map(() => TournamentAPIActions.UpdateTournamentSuccess({tournament: {...cuPayload.tournament}})),
                        catchError(err => of(TournamentAPIActions.UpdateTournamentError({err: err})))
                    )
                }else{
                    return this.tournamentApiService.createTournament(cuPayload.tournament).pipe(
                        map((tournamentId) => TournamentAPIActions.CreateTournamentSuccess({tournament: { ...cuPayload.tournament, id:tournamentId }})),
                        catchError(err => of(TournamentAPIActions.CreateTournamentError({err: err})))
                    )
                }
            }),
        )
    })


}