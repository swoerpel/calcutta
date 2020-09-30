import {createAction, props} from '@ngrx/store';
import { Tournament } from '../../../models/tournament.model';


export const CreateTournament = createAction(
    '[Tournament Page] Create Tournament',
    props<{tournament: Tournament}>()
);

export const UpdateTournament = createAction(
    '[Tournament Page] Update Tournament',
    props<{tournament: Tournament}>()
);

export const OpenTournament = createAction(
    '[Tournament Page] Open Tournament',
    props<{tournamentId: string}>()
);

export const DeleteTournament = createAction(
    '[Tournament Page] Delete Tournament',
    props<{tournamentId: string}>()
);
