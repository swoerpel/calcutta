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

export const GetTournamentById = createAction(
    '[Tournament API] Get Tournament By Id',
)

export const GetTournamentByIdSuccess = createAction(
    '[Tournament API] Get Tournament By Id Success',
    props<{tournament: Tournament}>()
)

export const GetTournamentByIdError = createAction(
    '[Tournament API] Get Tournament By Id Error',
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

export const UpdateTournamentSuccess = createAction(
    '[Tournament API] Update Tournament Success',
    props<{tournament: Tournament}>()
)

export const UpdateTournamentError = createAction(
    '[Tournament API] Update Tournament Error',
    props<{err: any}>()
)

export const DeleteTournamentSuccess = createAction(
    '[Tournament API] Delete Tournament Success',
    props<{tournamentId: string}>()
)

export const DeleteTournamentError = createAction(
    '[Tournament API] Delete Tournament Error',
    props<{err: any}>()
)

export const OpenTournamentError = createAction(
    '[Tournament API] Open Tournament Error',
    props<{err: any}>()
)

export const ResetCurrentTournament = createAction(
    '[Tournament API] Reset Current Tournament',
)

export const SetCurrentTournament = createAction(
    '[Tournament API] Reset Current Tournament',
    props<{tournamentId: string}>()
)