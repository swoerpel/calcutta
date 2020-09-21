import {createAction, props} from '@ngrx/store';
import { Tournament } from '../../../models/tournament.model';



export const GetTournaments = createAction(
    '[Tournament API] Get Tournaments',
)

export const GetTournamentsSuccess = createAction(
    '[Tournament API] Get Tournaments Success',
    props<{tournamentList: Tournament[]}>()
)

export const GetTournamentsError = createAction(
    '[Tournament API] Get Tournaments Error',
    props<{err: any}>()
)


export const CreateTournamentSuccess = createAction(
    '[Tournament API] Create Tournament Success',
    props<{tournament: Tournament}>()
)

export const CreateTournamentError = createAction(
    '[Tournament API] Create Tournament Error',
    props<{err: any}>()
)

export const OpenTournamentError = createAction(
    '[Tournament API] Open Tournament Error',
    props<{err: any}>()
)