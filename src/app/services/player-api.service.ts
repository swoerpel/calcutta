import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { Tournament } from '../models/tournament.model';
import { PlayerTournamentData } from '../models/player-tournament-data.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerApiService {

    constructor(
        private db: AngularFirestore,
    ){

    }

    createPlayer(player: Player): Observable<DocumentReference>{
        return from(this.db
            .collection<any>('players')
            .add(player)
        );
    }

    updatePlayer(player: Player): Observable<void>{
        return from(this.db
            .collection<any>('players')
            .doc(player.id)
            .update(player)
        );
    }

    deletePlayer(playerId: string): Observable<void>{
        return from(this.db
            .collection<any>('players')
            .doc(playerId)
            .delete()
        );
    }

    getPlayers(): Observable<Player[]>{

        // from(this.db.collection<any>('players').get()).pipe(map((querySnapshot) => {
        //     console.log('players querySnapshot',querySnapshot)
        //     // querySnapshot.docs
        //     // if(){

        //     // }
        //     querySnapshot.forEach((doc) => {
        //         // if(doc.id)
        //         console.log('doc',doc.data())
        //     //     doc.ref.update({
        //     //         capital: true
        //     //     });
        //     });
        // })).subscribe();

        return from(this.db
            .collection<any>('players')
            .get()
        ).pipe(map((res) => {
                let playerList: Player[] = [];
                res.forEach(d => {
                    playerList.push({
                        ...d.data(),
                        id: d.id,
                    } as Player)
                });
                return playerList;
            })
        )
    }

    // Creates the tournament instance within each players database,
    // this is where bet value and max better data is held per player per tournament
    registerPlayers(tournament: Tournament): Observable<void>{
        // console.log('registerPlayer',tournament)
        // tournament.players.forEach((p: ActivePlayer) => {
        //     this.db
        //     .collection<any>('players')
        //     .doc(p.playerId)
        //     .collection<any>('tournaments')
        //     .doc(tournament.id)
        //     .set({
        //         betValue: -1,
        //         highestBetUserId: null,
        //     } as PlayerTournamentData)
        // })
        // console.log('registering players at tournament',tournament)
        // // return from(
        // // );
        return of()
    }

    // Creates the tournament instance within each players database,
    // this is where bet value and max better data is held per player per tournament
    updateRegistration(tournament: Tournament): Observable<void>{
        console.log('registering players at tournament',tournament)
        // return from(this.db
        //     .collection<any>('players')
        //     .doc(tournament.players[0])
        //     .collection<any>('tournaments')
        //     .doc(tournament.id)
        //     .set({
        //         betValue: 0,
        //         highestBetUserId: null,
        //     } as PlayerTournamentData)
        // );
        return of();
    }

    updatePlayerBetValue(playerId: string, tournamentId: string, betValue: number): Observable<void>{
        console.log('betValue',betValue)
        return from(this.db
            .collection<any>('players')
            .doc(playerId)
            .collection<any>('tournaments')
            .doc(tournamentId)
            .update({
                betValue: betValue
            })
        );
    }


}