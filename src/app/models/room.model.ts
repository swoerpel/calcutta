import { Player } from './player.model';

export interface Room {
    name: string;
    id: string;
    players: Player[];
}