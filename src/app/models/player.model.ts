import { PlayerTournamentData } from './player-tournament-data.model';

export interface Player {
    firstName: string;
    lastName: string;
    id?: string;
    tournaments: PlayerTournamentData[],
    fargoRating?: number;
}