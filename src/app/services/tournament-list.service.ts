import { Injectable } from "@angular/core";
import { Tournament } from '../models/tournament.model';
import * as faker from '../../../node_modules/faker/dist/faker';
import { Player } from '../models/player.model';

@Injectable({
    providedIn: 'root'
})


export class TournamentListService {


    public readonly tournaments: Tournament[] = [
        {
            name: 'Tournament A',
            id: '111111',
            players: this.generatePlayers(),
        },
        {
            name: 'Tournament B',
            id: '111112',
            players: this.generatePlayers(),
        },
        {
            name: 'Tournament C',
            id: '111113',
            players: this.generatePlayers(),
        },
        {
            name: 'Tournament D',
            id: '111114',
            players: this.generatePlayers(),
        },
        {
            name: 'Tournament E',
            id: '111115',
            players: this.generatePlayers(),
        },
        {
            name: 'Tournament F',
            id: '111116',
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
            }
        })
        
    }

}
