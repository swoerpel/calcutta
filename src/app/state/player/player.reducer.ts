import { createReducer, on } from "@ngrx/store"
import { Player } from 'src/app/models/player.model';
import { PlayerAPIActions, PlayerPageActions } from './actions';

export interface PlayerState {
    playerList: Player[];
    getPlayersError: any;
    createPlayerError: any;
    updatePlayerError: any;
    deletePlayerError: any;
}

const initialState: PlayerState = {
    playerList: null,
    getPlayersError: null,
    createPlayerError: null,
    updatePlayerError: null,
    deletePlayerError: null,
}

export const playerReducer = createReducer<PlayerState>(
    initialState,
// ===============================================================================
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
// ===============================================================================
    on(PlayerPageActions.CreatePlayer, (state,action): PlayerState => {
        return {
            ...state,
            createPlayerError: null,
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
// ===============================================================================
    on(PlayerPageActions.UpdatePlayer, (state): PlayerState => {
        return {
            ...state,
            updatePlayerError: null,
        }
    }),
    on(PlayerAPIActions.UpdatePlayerSuccess, (state,action): PlayerState => {
        return {
            ...state,
            playerList: state.playerList.map((p) => {
                if (p.id === action.player.id){
                    return action.player
                }
                return p;
            })
        }
    }),
    on(PlayerAPIActions.UpdatePlayerError, (state,action): PlayerState => {
        return {
            ...state,
            updatePlayerError: action.err,
        }
    }),
// ===============================================================================
    on(PlayerPageActions.DeletePlayer, (state): PlayerState => {
        return {
            ...state,
            deletePlayerError: null,
        }
    }),
    on(PlayerAPIActions.DeletePlayerSuccess, (state, action): PlayerState => {
        return {
            ...state,
            playerList: state.playerList.filter(p => p.id != action.playerId),
            deletePlayerError: null,
        }
    }),
    on(PlayerAPIActions.DeletePlayerError, (state,action): PlayerState => {
        return {
            ...state,
            deletePlayerError: action.err
        }
    }),

);