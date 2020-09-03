import { Injectable } from "@angular/core";
import { Room } from '../models/room.model';
import * as faker from '../../../node_modules/faker/dist/faker';
import { Player } from '../models/player.model';

@Injectable({
    providedIn: 'root'
})


export class RoomListService {


    public readonly rooms: Room[] = [
        {
            name: 'Room A',
            id: '111111',
            players: this.generatePlayers(),
        },
        {
            name: 'Room B',
            id: '111112',
            players: this.generatePlayers(),
        },
        {
            name: 'Room C',
            id: '111113',
            players: this.generatePlayers(),
        },
        {
            name: 'Room D',
            id: '111114',
            players: this.generatePlayers(),
        },
        {
            name: 'Room E',
            id: '111115',
            players: this.generatePlayers(),
        },
        {
            name: 'Room F',
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
