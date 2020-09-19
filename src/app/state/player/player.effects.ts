import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, filter, withLatestFrom, take } from 'rxjs/operators';
import { of, Observable, from, EMPTY } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { PlayerState } from "./player.reducer";
import { PlayerAPIActions, PlayerPageActions } from './actions';

@Injectable({
    providedIn: 'root'
})
export class PlayerEffects {
    public user$: Observable<any>;

    constructor( 
        private actions$: Actions,
        private db: AngularFirestore,
        private playerStore: Store<PlayerState>,
        private router: Router,
    ){ 
 
    }

    getPlayers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            filter((action: any) => action?.payload.event.url === '/player-list'),
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
            take(1),
        )   
    });

    createPlayer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PlayerPageActions.CreatePlayer),
            // check duplicates here with filter (?)
            switchMap((payload) => {
                return from(this.db.collection<any>('players').add(payload.player)).pipe(
                    map((res) => {
                        return PlayerAPIActions.CreatePlayerSuccess({player: {
                            ...payload.player,
                            id:res.id
                        }})
                    }),
                    catchError(err => of(PlayerAPIActions.CreatePlayerError({err: err})))
                )
            }),
        )
    })

}