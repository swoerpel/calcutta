import { createFeatureSelector, createSelector } from "@ngrx/store"
import { of } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';
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
    (state: PlayerState,props: any) => {
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

export const GetPlayerBetValue = createSelector(
    getPlayerFeatureState,
    (state: PlayerState, props) =>  {
        console.log('props',props)
        const player = state.playerList
            .find((p: Player) => p.id === props.playerId)
        console.log('player',player);
            // ?.tournaments[props.tournamentId].betValue;
        // console.log('betValue',betValue)
        return 0;
        // return betValue;
    }
)
