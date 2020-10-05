import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Player } from '../models/player.model';
import { Tournament } from '../models/tournament.model';

@Injectable({
    providedIn: 'root'
})
export class TournamentApiService {

    constructor(
        private db: AngularFirestore,
    ){

    }

    createTournament(tournament: Tournament): Observable<string>{
        return from(this.db.collection<any>('tournaments').add(tournament)).pipe(
            map(res => res.id)
        );
    }

    updateTournament(tournament: Tournament): Observable<void>{
        return from(this.db.collection<any>('tournaments').doc(tournament.id).update(tournament));
    }

    deleteTournament(tournamentId: string): Observable<void>{
        return from(this.db.collection<any>('tournaments').doc(tournamentId).delete())
    }

    getTournaments(): Observable<Tournament[]>{
        return from(this.db.collection<any>('tournaments').get()).pipe(
            map((res) => {
                let tournamentList = [];
                res.forEach(d => {
                    tournamentList.push({
                        ...d.data(),
                        id: d.id,
                    })
                });
                console.log('tournamentList',tournamentList)
                return tournamentList
            }),
        );
    }

    getTournamentById(tournamentId): Observable<Tournament>{
        let dbTournament = this.db.collection<any>('tournaments').doc(tournamentId)
        return from(dbTournament.get().pipe(
            switchMap((t) => {
                return from(dbTournament.collection('active_players').get()).pipe(
                    map((active_players) => {
                        return {
                            ...t.data(),
                            activePlayers: active_players.docs.map((p => p.data())),
                        } as Tournament
                    })
                )
            })
        ))
    }

}