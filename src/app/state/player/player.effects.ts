import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, filter, withLatestFrom, take, first } from 'rxjs/operators';
import { of, Observable, from, EMPTY } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { INIT, Store } from '@ngrx/store';
import { PlayerState } from "./player.reducer";
import { PlayerAPIActions, PlayerPageActions } from './actions';
import { GetAllPlayers } from './player.selectors';
import { playerExists } from '../../shared/helpers';

@Injectable({
    providedIn: 'root'
})
export class PlayerEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private db: AngularFirestore,
        private playerStore: Store<PlayerState>,
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
                return this.db.collection<any>('players').get().pipe(
                    map((res) => {
                        let playerList = [];
                        res.forEach(d => {
                            playerList.push({
                                ...d.data(),
                                id: d.id,
                            })
                        });
                        return PlayerAPIActions.GetPlayersSuccess({playerList: playerList})
                    }),
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
                        // Should be dispatching UpdatePlayerError -> 
                        // Should actually be dispatching general page error
                        return of(PlayerAPIActions.CreatePlayerError({err: 'duplicate player'}));
                    }
                    return from(this.db.collection<any>('players').doc(cuPayload.player.id).update(cuPayload.player)).pipe(
                        map(() => {
                            return PlayerAPIActions.UpdatePlayerSuccess({player: {
                                ...cuPayload.player,
                            }})
                        }),
                        catchError(err => of(PlayerAPIActions.UpdatePlayerError({err: err})))
                    )
                } else {
                    if (playerExists(players, cuPayload.player)){
                        return of(PlayerAPIActions.CreatePlayerError({err: 'duplicate player'}));
                    }
                    return from(this.db.collection<any>('players').add(cuPayload.player)).pipe(
                        map((res) => {
                            return PlayerAPIActions.CreatePlayerSuccess({player: {
                                ...cuPayload.player,
                                id:res.id
                            }})
                        }),
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
                return from(this.db.collection<any>('players').doc(payload.player.id).delete()).pipe(
                    map((res) => {
                        return PlayerAPIActions.DeletePlayerSuccess({playerId: payload.player.id})
                    }),
                    catchError(err => of(PlayerAPIActions.DeletePlayerError({err: err})))
                )
            }),
        )
    })

}