import { createFeatureSelector, createSelector } from "@ngrx/store"
import { PlayerState } from "./player.reducer";

const getPlayerFeatureState = createFeatureSelector<PlayerState>('player');

export const GetAllPlayers = createSelector(
    getPlayerFeatureState,
    (state: PlayerState) => {
        return state.playerList;
    }
)

export const GetCreatePlayerError = createSelector(
    getPlayerFeatureState,
    (state: PlayerState) => {
        return state.createPlayerError;
    }
)

export const GetCreatePlayerSuccess = createSelector(
    getPlayerFeatureState,
    (state: PlayerState) => {
        return state.createPlayerError;
    }
)

export const GetPlayerSet = createSelector(
    getPlayerFeatureState,
    (state: PlayerState,props: { playerIds: string[]}) => {
        return state.playerList?.filter((p) => {
            return props.playerIds?.indexOf(p.id) !== -1;
        });
    }
)

export const GetTempPlayerList = createSelector(
    getPlayerFeatureState,
    (state: PlayerState) =>  {
        return state.tempPlayerList
    }
)

