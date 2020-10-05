import { createFeatureSelector, createSelector } from "@ngrx/store"
import { TournamentState } from "./tournament.reducer";

const getTournamentFeatureState = createFeatureSelector<TournamentState>('tournament');

export const GetTournaments = createSelector(
    getTournamentFeatureState,
    (state: TournamentState) => {
        return state.tournamentList;
    }
)

// deprecated
// export const GetCurrentTournament = createSelector(
//     getTournamentFeatureState,
//     (state: TournamentState) => {
//         return state.tournamentList?.find(t => t.id === state.tournamentId);
//     }
// )

export const GetCurrentTournament = createSelector(
    getTournamentFeatureState,
    (state: TournamentState, props) => {
        return state.currentTournament;
        // return state.tournamentList?.find(t => t.id === props.tournamentId);
    }
)

// potential deprecation
export const GetCurrentTournamentId = createSelector(
    getTournamentFeatureState,
    (state: TournamentState) => {
        return state.tournamentId;
    }
)
