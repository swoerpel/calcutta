import {createAction, props} from '@ngrx/store';
import { User } from '../../../models/user.model';


export const LoginUserSuccess = createAction(
    '[User API] Login User Successful',
    props<{user: User}>()
)

export const LoginUserError = createAction(
    '[User API] Login User Error',
    props<{err: any}>()
)

export const RegisterUserSuccess = createAction(
    '[User API] Register User Successful',
    props<{user: User}>()
)

export const RegisterUserError = createAction(
    '[User API] Register User Error',
    props<{err: string}>()
)

export const LogoutUser = createAction(
    '[User API] User Logged Out',
)

export const AssignUserPrivileges = createAction(
    '[User API] Assign User Privileges',
    props<{isAdmin: boolean}>()
)

