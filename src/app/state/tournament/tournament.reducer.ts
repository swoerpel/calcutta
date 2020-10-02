import { Tournament } from "../../models/tournament.model"
import { createReducer, on } from "@ngrx/store"
import { TournamentPageActions, TournamentAPIActions } from "./actions";

export interface TournamentState {
    tournamentList: Tournament[];
    tournamentId: string;

    // HOLDS BETTING DATA
    tempTournament: any;

    getTournamentsError: any;
    createTournamentError: any;
    updateTournamentError: any;
    deleteTournamentError: any;
    openTournamentError: any;
}

const initialState: TournamentState = {
    tournamentList: null,
    tournamentId: null,

    tempTournament: {},

    getTournamentsError: null,
    createTournamentError: null,
    updateTournamentError: null,
    deleteTournamentError: null,
    openTournamentError: null,
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
    on(TournamentPageActions.UpdateTournament, (state): TournamentState => {
        return {
            ...state,
            updateTournamentError: null,
        }
    }),
    on(TournamentAPIActions.UpdateTournamentSuccess, (state,action): TournamentState => {
        return {
            ...state,
            tournamentList: state.tournamentList.map((t) => {
                if (t.id === action.tournament.id){
                    return action.tournament
                }
                return t;
            })
        }
    }),
    on(TournamentAPIActions.UpdateTournamentError, (state,action): TournamentState => {
        return {
            ...state,
            updateTournamentError: action.err,
        }
    }),
// ===============================================================================
    on(TournamentPageActions.DeleteTournament, (state): TournamentState => {
        return {
            ...state,
            deleteTournamentError: null,
        }
    }),
    on(TournamentAPIActions.DeleteTournamentSuccess, (state,action): TournamentState => {
        return {
            ...state,
            tournamentList: state.tournamentList.filter(t => t.id !== action.tournamentId)
        }
    }),
    on(TournamentAPIActions.DeleteTournamentError, (state,action): TournamentState => {
        return {
            ...state,
            deleteTournamentError: action.err,
        }
    }),
// ===============================================================================
    on(TournamentPageActions.OpenTournament, (state, action): TournamentState => {
        return {
            ...state,
            tournamentId: action.tournamentId,
            openTournamentError: null,
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
    on(TournamentAPIActions.ResetCurrentTournament, (state): TournamentState => {
        return {
            ...state,
            tournamentId: null, 
        }
    }),
    on(TournamentAPIActions.SetCurrentTournament, (state, action): TournamentState => {
        return {
            ...state,
            tournamentId: action.tournamentId, 
        }
    }),



);