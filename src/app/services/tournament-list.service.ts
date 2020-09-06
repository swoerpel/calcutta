import { Injectable } from "@angular/core";
import { Tournament } from '../models/tournament.model';
import * as faker from '../../../node_modules/faker/dist/faker';
import { Player } from '../models/player.model';
import { makeId } from '../shared/helpers';
@Injectable({
    providedIn: 'root'
})


export class TournamentListService {

    public tournaments: Tournament[] = [
        {
            id: makeId(),
            name: 'Tournament A',
            roomName: 'Ball Room',
            endTime: '06:00',
            players: this.generatePlayers(),
        },
    ]

    constructor() {}

    public generatePlayers(): Player[]{
        return new Array(5).fill({}).map((p, index) => {
            return {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                id: index.toString(),
                currentBetPrice: Math.floor(Math.random() * 100),
                fargoRating: Math.floor(Math.random() * 500) + 300
            }
        })
        
    }

    public createTournament(tournament: Tournament): string{
        let idExists = true;
        let id;
        while(idExists){
            id = makeId();
            idExists = this.tournaments.find(t => t.id == id) === null
        }
        this.tournaments.push({...tournament, id: id})
        return id;
    }

    public updateTournament(tournament: Tournament): void{
        this.tournaments = this.tournaments.map(t => {
            if(t.id === tournament.id){
                return tournament;
            }
            return t;
        });
    }

}


