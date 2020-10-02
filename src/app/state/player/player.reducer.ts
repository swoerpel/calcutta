import { createReducer, on } from "@ngrx/store"
import { Player } from 'src/app/models/player.model';
import { PlayerAPIActions, PlayerPageActions } from './actions';

export interface PlayerState {
    playerList: Player[];
    tempPlayerList: Player[];
    getPlayersError: any;
    createPlayerError: any;
    updatePlayerError: any;
    deletePlayerError: any;
    updatePlayerBetError: any;
}

const initialState: PlayerState = {
    playerList: null,
    tempPlayerList: null,
    getPlayersError: null,
    createPlayerError: null,
    updatePlayerError: null,
    deletePlayerError: null,
    updatePlayerBetError: null,
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
    // =============================================================================
    on(PlayerPageActions.UpdatePlayerBetValue, (state,action): PlayerState => {
        return {
            ...state,
            updatePlayerBetError: null,
        }
    }),
    on(PlayerAPIActions.UpdatePlayerBetValueSuccess, (state,action): PlayerState => {
        return {
            ...state,
            playerList: state.playerList.map((player: Player) => {
                if(player.id === action.playerId){
                    return {
                        ...player,
                        tournaments:{
                            ...player.tournaments,
                            [action.tournamentId]: {
                                betValue: action.betValue
                                // TOP BET PLAYER USER NAME GOES HERE
                            }
                        }
                    }
                }
                return player;
            })
        }
    }),
    on(PlayerAPIActions.UpdatePlayerBetValueError, (state, action): PlayerState => {
        return {
            ...state,
            updatePlayerBetError: action.err,
        }
    }),
    // =============================================================================
    on(PlayerPageActions.AddTempPlayer, (state,action): PlayerState => {
        return {
            ...state,
            tempPlayerList: [...state.tempPlayerList, action.player]
        }
    }),
    on(PlayerPageActions.RemoveTempPlayer, (state,action): PlayerState => {
        return {
            ...state,
            tempPlayerList: state.tempPlayerList.filter(p => p.id !== action.player.id)
        }
    }),
    on(PlayerPageActions.SetTempPlayerList, (state,action): PlayerState => {
        let players = [];
        if(action.playerIds.length !== 0)
            players = state.playerList.filter((player) => action.playerIds.indexOf(player.id) !== -1)
        console.log('setting temp player list', players)
        return {
            ...state,
            tempPlayerList: players
        }
    }),
    on(PlayerPageActions.ResetTempPlayerList, (state): PlayerState => {
        return {
            ...state,
            tempPlayerList: []
        }
    }),

);