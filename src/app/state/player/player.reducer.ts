import { createReducer, on } from "@ngrx/store"
import { Action } from "rxjs/internal/scheduler/Action";
import { Player } from 'src/app/models/player.model';
import { PlayerAPIActions, PlayerPageActions } from './actions';
import { PlayerListComponent } from 'src/app/pages/player-list/player-list.component';

export interface PlayerState {
    playerList: Player[];
    getPlayersError: any;
    createPlayerError: any;
}

const initialState: PlayerState = {
    playerList: null,
    getPlayersError: null,
    createPlayerError: null,
}

export const playerReducer = createReducer<PlayerState>(
    initialState,

    // default reducer 
    // API Actions
    on(PlayerAPIActions.GetPlayers, (state): PlayerState => {
        return {
            ...state,
            getPlayersError: null,
        }
    }),
    on(PlayerAPIActions.GetPlayersSuccess, (state,action): PlayerState => {
        return {
            ...state,
            playerList: action.playerList,
            getPlayersError: null,
        }
    }),
    on(PlayerAPIActions.GetPlayersError, (state,action): PlayerState => {
        return {
            ...state,
            getPlayersError: action.err,
        }
    }),

    on(PlayerPageActions.CreatePlayer, (state,action): PlayerState => {
        return {
            ...state,
        }
    }),
    on(PlayerAPIActions.CreatePlayerSuccess, (state,action): PlayerState => {
        return {
            ...state,
            playerList: [...state.playerList, action.player],
        }
    }),
    on(PlayerAPIActions.CreatePlayerError, (state,action): PlayerState => {
        return {
            ...state,
            createPlayerError: action.err
        }
    }),

);