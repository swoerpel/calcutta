import { createFeatureSelector, createSelector } from "@ngrx/store"
import { TournamentState } from "./tournament.reducer";

const getTournamentFeatureState = createFeatureSelector<TournamentState>('tournament');

export const GetTournaments = createSelector(
    getTournamentFeatureState,
    (state: TournamentState) => {
        return state.tournamentList;
    }
)

export const GetTournament = createSelector(
    getTournamentFeatureState,
    (state: TournamentState) => {
        return state.tournamentList?.find(t => t.id === state.tournamentId);
    }
)
