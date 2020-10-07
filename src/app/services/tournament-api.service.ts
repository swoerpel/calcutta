import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { find } from 'lodash';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivePlayer } from '../models/active-player.model';
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

    createTournament(tournament: Tournament, playerList: Player[]): Observable<any>{
        return from(this.db.collection<any>('tournaments').add({
            name: tournament.name,
            location: tournament.location,
            endTime: tournament.endTime,
            duration: tournament?.duration
        })).pipe(
            switchMap((res) => {
                return from(this.db.collection<any>('players').get()).pipe(
                    map((res) => res.docs.filter((p) => playerList.find((player: Player) => player.id === p?.id))
                        .map((p): any => {
                            let playerData = p.data();
                            delete playerData.activeTournaments
                            return {
                                ...playerData,
                                id: p.id,
                                betValue: 0,
                                maxBetUserId: '',
                            }
                        })
                    ),
                    map((filteredPlayers) => {
                        let tournamentRef = this.db.collection<any>('tournaments').doc(res.id)
                        return filteredPlayers.map((fp: any) => {
                            const playerId = fp.id;
                            delete fp.id;
                            tournamentRef.collection('active_players').doc(playerId).set({...fp});
                            return fp
                        })
                    })
                )
            }),
        )
    }

    updateTournament(tournament: Tournament): Observable<void>{
        console.log('UPDATE NOT IMPLEMENTED YET FOR TOURNAMENTS', tournament)
        return of();
        // return from(this.db.collection<any>('tournaments').doc(tournament.id).update(tournament));
    }

    deleteTournament(tournamentId: string): Observable<void>{
        return from(this.db.collection<any>('tournaments').doc(tournamentId).delete())
    }

    getTournaments(): Observable<any[]>{
        let tournamentsRef = this.db.collection<any>('tournaments');
        return from(tournamentsRef.get()).pipe(
            map((res) => {
                let tournamentList = res.docs.map(d => {
                    return {
                        ...d.data(),
                        id: d.id,
                    }
                });
                return tournamentList
            }),
            // map((tournaments) => {
                // console.log('tournaments',tournaments)
                
                // let tournamentRefs = tournaments.map((t) => {
                //     tournamentsRef.doc(t.id).collection('active_players').doc() 
                // })
                // console.log('tournamentRefs',tournamentRefs)
                
                // return tournaments;
            // })
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