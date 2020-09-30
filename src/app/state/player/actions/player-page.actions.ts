import {createAction, props} from '@ngrx/store';
import { Player } from 'src/app/models/player.model';


export const CreatePlayer = createAction(
    '[Player Page Action] Create Player',
    props<{player: Player}>()
);

export const DeletePlayer = createAction(
    '[Player Page Action] Delete Player',
    props<{player: Player}>()
);

export const UpdatePlayer = createAction(
    '[Player Page Action] Update Player',
    props<{player: Player}>()
);

export const AddTempPlayer = createAction(
    '[Player Page Action] Add Temp Player',
    props<{player: Player}>()
);

export const RemoveTempPlayer = createAction(
    '[Player Page] Remove Temp Player',
    props<{player: Player}>()
);

export const SetTempPlayerList = createAction(
    '[Player Page Action] Set Temp Player List',
    props<{playerIds: string[]}>()
);

export const ResetTempPlayerList = createAction(
    '[Player Page Action] Reset Temp Player List',
);

export const UpdatePlayerBetValue = createAction(
    '[Player Page Action] Update Player Bet Value',
    props<{playerId: string; betValue: number;}>()
);
