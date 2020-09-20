import { Tournament } from "../../models/tournament.model"
import { createReducer, on } from "@ngrx/store"
import { TournamentPageActions, TournamentAPIActions } from "./actions";

export interface TournamentState {
    tournamentList: Tournament[];
    tournamentId: string;
    getTournamentsError: any;
    createTournamentError: any;
    updateTournamentError: any;
    deleteTournamentError: any;
}

const initialState: TournamentState = {
    tournamentList: null,
    tournamentId: null,
    getTournamentsError: null,
    createTournamentError: null,
    updateTournamentError: null,
    deleteTournamentError: null,
}

export const tournamentReducer = createReducer<TournamentState>(
    initialState,
    // ===============================================================================
    on(TournamentAPIActions.GetTournaments, (state): TournamentState => {
        return {
            ...state,
            getTournamentsError: null,
        }
    }),
    on(TournamentAPIActions.GetTournamentsSuccess, (state,action): TournamentState => {
        return {
            ...state,
            tournamentList: action.tournamentList,
            getTournamentsError: null,
        }
    }),
    on(TournamentAPIActions.GetTournamentsError, (state,action): TournamentState => {
        return {
            ...state,
            getTournamentsError: action.err,
        }
    }),
// ===============================================================================
    on(TournamentPageActions.CreateTournament, (state): TournamentState => {
        return {
            ...state,
            createTournamentError: null,
        }
    }),
    on(TournamentAPIActions.CreateTournamentSuccess, (state,action): TournamentState => {
        return {
            ...state,
            tournamentList: [...state.tournamentList, action.tournament],
            createTournamentError: null,
        }
    }),
    on(TournamentAPIActions.CreateTournamentError, (state,action): TournamentState => {
        return {
            ...state,
            createTournamentError: action.err,
        }
    }),
// ===============================================================================

// ===============================================================================

// ===============================================================================
    on(TournamentPageActions.OpenTournament, (state,action): TournamentState => {
        return {
            ...state,
            tournamentId: action.tournamentId,
        }
    }),



);