import { Player } from "./player.model";
import { ActivePlayer } from "./active-player.model";

export interface Tournament {
    id?: string;
    name: string;
    location: string;
    endTime: string;
    duration?: string;
    activePlayers?: ActivePlayer[];
    players?: Player[];
}
