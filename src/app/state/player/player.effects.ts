import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, filter, withLatestFrom, take, first } from 'rxjs/operators';
import { of, Observable, from, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { INIT, Store } from '@ngrx/store';
import { PlayerState } from "./player.reducer";
import { PlayerAPIActions, PlayerPageActions } from './actions';
import { GetAllPlayers } from './player.selectors';
import { playerExists } from '../../shared/helpers';
import { PlayerApiService } from 'src/app/services/player-api.service';
import { Player } from 'src/app/models/player.model';
import { TournamentAPIActions, TournamentPageActions } from '../tournament/actions';
import { TournamentState } from '../tournament/tournament.reducer';
import { GetCurrentTournament, GetCurrentTournamentId } from '../tournament/tournament.selectors';

@Injectable({
    providedIn: 'root'
})
export class PlayerEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private playerStore: Store<PlayerState>,
        private tournamentStore: Store<TournamentState>,
        private playerApiService: PlayerApiService,
    ){ 
 
    }

    getPlayers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            map((action: any) => action?.payload.event.url.split('/')),
            filter((action: any) => {
                action.shift();
                return (
                    (action[0] === 'create-tournament') || 
                    (action[0] === 'manage-player-list') ||
                    (action[0] === 'tournament-list')
                );
                }
            ),
            switchMap(() => {
                return this.playerApiService.getPlayers().pipe(
                    map((playerList: Player[]) => PlayerAPIActions.GetPlayersSuccess({playerList: playerList})),
                    catchError((err) => {
                        this.playerStore.dispatch(PlayerAPIActions.GetPlayersError({err: err}))
                        return EMPTY;
                    })
                )
            }),
            // take(1), // MIGHT NEED THIS, FOR LOADING WHEN NOT DEBUGGING
        )   
    });


    createAndUpdatePlayer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PlayerPageActions.CreatePlayer, PlayerPageActions.UpdatePlayer),
            withLatestFrom(this.playerStore.select(GetAllPlayers)),
            switchMap(([cuPayload,players]) => {
                if(cuPayload.type === PlayerPageActions.UpdatePlayer.type){
                    if (playerExists(players.filter(p => p.id !== cuPayload.player.id), cuPayload.player)){
                        return of(PlayerAPIActions.UpdatePlayerError({err: 'duplicate player'}));
                    }
                    return this.playerApiService.updatePlayer(cuPayload.player).pipe(
                        map(() => PlayerAPIActions.UpdatePlayerSuccess({ player: { ...cuPayload.player}})),
                        catchError(err => of(PlayerAPIActions.UpdatePlayerError({err: err})))
                    )
                } else {
                    if (playerExists(players, cuPayload.player)){
                        return of(PlayerAPIActions.CreatePlayerError({err: 'duplicate player'}));
                    }
                    return this.playerApiService.createPlayer(cuPayload.player).pipe(
                        map((res) => PlayerAPIActions.CreatePlayerSuccess({player: { ...cuPayload.player, id:res.id}})),
                        catchError(err => of(PlayerAPIActions.CreatePlayerError({err: err})))
                    )
                }
            }),
        )
    })
    


    deletePlayer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PlayerPageActions.DeletePlayer),
            switchMap((payload) => {
                return this.playerApiService.deletePlayer(payload.player.id).pipe(
                    map(() => PlayerAPIActions.DeletePlayerSuccess({playerId: payload.player.id})),
                    catchError(err => of(PlayerAPIActions.DeletePlayerError({err: err})))
                )
            }),
        )
    })

    updatePlayerBetValue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PlayerPageActions.UpdatePlayerBetValue),
            withLatestFrom(this.tournamentStore.select(GetCurrentTournamentId)),
            switchMap(([payload,tournamentId]) => {
                return this.playerApiService.updatePlayerBetValue(payload.playerId, tournamentId, payload.betValue).pipe(
                    map(() => {
                        return PlayerAPIActions.UpdatePlayerBetValueSuccess({
                            playerId: payload.playerId,
                            tournamentId: tournamentId,
                            betValue: payload.betValue
                        });
                    }),
                    catchError(err => of(PlayerAPIActions.UpdatePlayerBetValueError({err: err})))
                )
            }),
        )
    })

    registerPlayer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TournamentAPIActions.CreateTournamentSuccess),
            switchMap((payload) => {
                return this.playerApiService.registerPlayers(payload.tournament).pipe(
                    map(() => PlayerAPIActions.RegisterPlayersSuccess()),
                    catchError(err => of(PlayerAPIActions.RegisterPlayersError({err: err})))
                )
            }),
        )
    })

    // UNFINISHED, Difficult list difference merge needed
    // updateRegistration$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(TournamentPageActions.UpdateTournament),
    //         withLatestFrom(this.tournamentStore.select(GetCurrentTournament)),
    //         switchMap(([payload, tournament]) => {
    //             // console.log('payload',payload.tournament.players)
    //             console.log('tournament',tournament)
    //             const diffArray = (arr1, arr2) => arr1
    //                 .concat(arr2)
    //                 .filter(val => !(
    //                     arr1.includes(val) && 
    //                     arr2.includes(val)
    //                 ));
    //             // new players
    //             payload.tournament.players
    //             const addedToTournament = [];
    //             const removedFromTournament = [];
    //             const changes = diffArray(payload.tournament.players, tournament.players)
    //             // console.log('changes',changes)
    //             return this.playerApiService.updateRegistration(payload.tournament).pipe(
    //                 map(() => PlayerAPIActions.UpdateRegistrationSuccess()),
    //                 catchError(err => of(PlayerAPIActions.UpdateRegistrationError({err: err})))
    //             )
    //         }),
    //     )
    // })


   
}