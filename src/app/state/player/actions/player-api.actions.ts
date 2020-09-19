import {createAction, props} from '@ngrx/store';
import { Player } from 'src/app/models/player.model';

export const GetPlayers = createAction(
    '[Players API] Get Players',
)

export const GetPlayersSuccess = createAction(
    '[Players API] Get Players Success',
    props<{playerList: Player[]}>()
)

export const GetPlayersError = createAction(
    '[Players API] Get Players Error',
    props<{err: any}>()
)

export const CreatePlayerSuccess = createAction(
    '[Players API] Create Player Success',
    props<{player: Player}>()
)

export const CreatePlayerError = createAction(
    '[Players API] Create Player Error',
    props<{err: any}>()
)


