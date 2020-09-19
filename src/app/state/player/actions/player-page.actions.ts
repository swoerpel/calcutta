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
