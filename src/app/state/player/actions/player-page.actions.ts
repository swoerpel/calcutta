import {createAction, props} from '@ngrx/store';
import { Player } from 'src/app/models/player.model';


export const CreatePlayer = createAction(
    '[Player Page] Create Player',
    props<{player: Player}>()
);

export const DeletePlayer = createAction(
    '[Player Page] Delete Player',
    props<{player: Player}>()
);

export const UpdatePlayer = createAction(
    '[Player Page] Update Player',
    props<{player: Player}>()
);

export const AddTempPlayer = createAction(
    '[Player Page] Add Temp Player',
    props<{player: Player}>()
);

export const SetTempPlayerList = createAction(
    '[Player Page] Set Temp Player List',
    props<{playerIds: string[]}>()
);

export const ResetTempPlayerList = createAction(
    '[Player Page] Reset Temp Player List',
);
