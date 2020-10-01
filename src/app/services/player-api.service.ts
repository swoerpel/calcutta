import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../models/player.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerApiService {

    constructor(
        private db: AngularFirestore,
    ){

    }

    createPlayer(player: Player): Observable<DocumentReference>{
        return from(this.db.collection<any>('players').add(player));
    }

    updatePlayer(player: Player): Observable<void>{
        return from(this.db.collection<any>('players').doc(player.id).update(player));
    }

    deletePlayer(playerId: string): Observable<void>{
        return from(this.db.collection<any>('players').doc(playerId).delete())
    }

    getPlayers(): Observable<Player[]>{
        return from(this.db.collection<any>('players').get()).pipe(
            map((res) => {
                let playerList: Player[] = [];
                res.forEach(d => {
                    playerList.push({
                        ...d.data(),
                        id: d.id,
                    } as Player)
                });
                return playerList;
            })
        );
    }

    updatePlayerBetValue(playerId: string, tournamentId: string, betValue: number): Observable<void>{
        return from(this.db.collection<any>('players').doc(playerId).update({betValue: betValue}))
    }


}