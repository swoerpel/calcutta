import { Tournament } from "../../models/tournament.model"
import { createReducer, on } from "@ngrx/store"
import { TournamentPageActions, TournamentAPIActions } from "./actions";
import { Action } from "rxjs/internal/scheduler/Action";

export interface TournamentState {
    tournamentList: Tournament[];
    tournamentId: string;
    getTournamentsError: any;
}

const initialState: TournamentState = {
    tournamentList: null,
    tournamentId: null,
    getTournamentsError: null,
}

export const tournamentReducer = createReducer<TournamentState>(
    initialState,

    // default reducer 
    // API Actions
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


    // Page Actions
    on(TournamentPageActions.OpenTournament, (state,action): TournamentState => {
        return {
            ...state,
            tournamentId: action.tournamentId,
        }
    }),

    // on(TournamentPageActions.CreateTournament, (state,action): TournamentState => {
    //     return {
    //         ...state,
    //     }
    // }),

);