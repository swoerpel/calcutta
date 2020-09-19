import {createAction, props} from '@ngrx/store';
import { Tournament } from '../../../models/tournament.model';


export const CreateTournament = createAction(
    '[Tournament Page] Create Tournament',
    props<{tournament: Tournament}>()
);


export const OpenTournament = createAction(
    '[Tournament Page] Open Tournament',
    props<{tournamentId: string}>()
);
