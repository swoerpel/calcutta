import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, filter, withLatestFrom, take } from 'rxjs/operators';
import { of, Observable, from, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { TournamentPageActions,TournamentAPIActions } from './actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { TournamentState } from './tournament.reducer';
import { INIT, Store } from '@ngrx/store';
import { TournamentApiService } from 'src/app/services/tournament-api.service';
import { Tournament } from 'src/app/models/tournament.model';
import { PlayerState } from '../player/player.reducer';
import { GetTempPlayerList } from '../player/player.selectors';

@Injectable({
    providedIn: 'root'
})
export class TournamentEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private tournamentApiService: TournamentApiService,
        private tournamentStore: Store<TournamentState>,
        private playerStore: Store<PlayerState>,
        private router: Router,
    ){ }

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

    getTournamentById$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED,INIT),
            map((action: any) => {
                let url = action?.payload.event.url.split('/');
                url.shift();
                return {baseUrl: url[0], tournamentId: url[1]};
            }),
            filter((routeObj: any) => routeObj.baseUrl === 'tournament-list' && !!routeObj.tournamentId),
            switchMap((routeObj: any) => {
                return this.tournamentApiService.getTournamentById(routeObj.tournamentId).pipe(
                    map((tournament: Tournament) => TournamentAPIActions.GetTournamentByIdSuccess({tournament: tournament})),
                    catchError((err) => of(TournamentAPIActions.GetTournamentByIdError({err: err})))
                )
            }),
        );   
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
            withLatestFrom(this.playerStore.select(GetTempPlayerList)),
            switchMap(([cuPayload, tempPlayerList]) => {
                if(cuPayload.type === TournamentPageActions.UpdateTournament.type){
                    this.router.navigate(['/tournament-list',cuPayload.tournament.id]);
                    return this.tournamentApiService.updateTournament(cuPayload.tournament).pipe(
                        map(() => TournamentAPIActions.UpdateTournamentSuccess({tournament: {...cuPayload.tournament}})),
                        catchError(err => of(TournamentAPIActions.UpdateTournamentError({err: err})))
                    )
                }else{
                    this.router.navigate(['/tournament-list']);
                    return this.tournamentApiService.createTournament(cuPayload.tournament,tempPlayerList).pipe(
                        map((tournamentId) => TournamentAPIActions.CreateTournamentSuccess({tournament: { ...cuPayload.tournament, id:tournamentId }})),
                        catchError(err => of(TournamentAPIActions.CreateTournamentError({err: err})))
                    )
                }
            }),
        )
    })



}