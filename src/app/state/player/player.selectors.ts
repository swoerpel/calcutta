import { createFeatureSelector, createSelector } from "@ngrx/store"
import { PlayerState } from "./player.reducer";

const getPlayerFeatureState = createFeatureSelector<PlayerState>('player');

export const GetPlayers = createSelector(
    getPlayerFeatureState,
    (state: PlayerState) => {
        return state.playerList;
    }
)

// export const GetTournament = createSelector(
//     getPlayerFeatureState,
//     (state: TournamentState) => {
//         return state.tournamentList?.find(t => t.id === state.tournamentId);
//     }
// )
