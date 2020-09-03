import { Player } from './player.model';

export interface Tournament {
    name: string;
    id: string;
    players: Player[];
}