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
import { PlayerApiService } from 'src/app/services/playerApi.service';
import { Player } from 'src/app/models/player.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private playerStore: Store<PlayerState>,
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
                    map((res) => PlayerAPIActions.DeletePlayerSuccess({playerId: payload.player.id})),
                    catchError(err => of(PlayerAPIActions.DeletePlayerError({err: err})))
                )
            }),
        )
    })

    updatePlayerBetValue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PlayerPageActions.UpdatePlayerBetValue),
            switchMap((payload) => {
                return this.playerApiService.updatePlayerBetValue(payload.playerId, '', payload.betValue).pipe(
                    map(() => {
                        return PlayerAPIActions.UpdatePlayerBetValueSuccess({
                            playerId: payload.playerId,
                            betValue: payload.betValue
                        });
                    }),
                    catchError(err => of(PlayerAPIActions.UpdatePlayerBetValueError({err: err})))
                )
            }),
        )
    })

    // createPlayerTournamentCollection$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(TournamentAPIActions.CreateTournamentSuccess),
            // switchMap((payload) => {



                // console.log('payload createPlayerTournamentCollection',payload)
                // console.log(payload.tournament.players.)
                // this.db.collection<any>('Players').doc(payload.pl)
                // return of(TournamentAPIActions.CreateTournamentSuccess({tournament: payload.tournament}));
                // return from(this.db.collection<any>('players').doc(payload.playerId).update({betValue: payload.betValue})).pipe(
                //     map(() => {
                //         return PlayerAPIActions.UpdatePlayerBetValueSuccess({
                //             playerId: payload.playerId,
                //             betValue: payload.betValue
                //         });
                //     }),
                //     catchError(err => of(PlayerAPIActions.UpdatePlayerBetValueError({err: err})))
        //         // )
        //     }),
        // )
    // })


   
}