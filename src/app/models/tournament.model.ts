import { Player } from "./player.model";

export interface Tournament {
    id?: string;
    name: string;
    roomName: string;
    endTime: string;
    duration?: string;
    players: string[];
}