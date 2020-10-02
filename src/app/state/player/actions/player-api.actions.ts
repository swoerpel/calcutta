import {createAction, props} from '@ngrx/store';
import { Player } from 'src/app/models/player.model';

export const GetPlayers = createAction(
    '[Players API Action] Get Players',
)

export const GetPlayersSuccess = createAction(
    '[Players API Action] Get Players Success',
    props<{playerList: Player[]}>()
)

export const GetPlayersError = createAction(
    '[Players API Action] Get Players Error',
    props<{err: any}>()
)

export const CreatePlayerSuccess = createAction(
    '[Players API Action] Create Player Success',
    props<{player: Player}>()
)

export const CreatePlayerError = createAction(
    '[Players API Action] Create Player Error',
    props<{err: any}>()
)

export const RegisterPlayersSuccess = createAction(
    '[Players API Action] Register Players Success',
)

export const RegisterPlayersError = createAction(
    '[Players API Action] Register Players Error',
    props<{err: any}>()
)

export const UpdateRegistrationSuccess = createAction(
    '[Players API Action] Update Registration Success',
)

export const UpdateRegistrationError = createAction(
    '[Players API Action] Update Registration Error',
    props<{err: any}>()
)

export const UpdatePlayerSuccess = createAction(
    '[Players API Action] Update Player Success',
    props<{player: Player}>()
)

export const UpdatePlayerError = createAction(
    '[Players API Action] Update Player Error',
    props<{err: any}>()
)

export const DeletePlayerSuccess = createAction(
    '[Players API Action] Delete Player Success',
    props<{playerId: string}>()
)

export const DeletePlayerError = createAction(
    '[Players API Action] Delete Player Error',
    props<{err: any}>()
)


export const UpdatePlayerBetValueSuccess = createAction(
    '[Players API Action] Update Player Bet Value Success',
    props<{playerId:string, betValue: number}>()
)

export const UpdatePlayerBetValueError = createAction(
    '[Players API Action] Update Player Bet Value Error',
    props<{err: any}>()
)


