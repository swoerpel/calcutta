import {createAction, props} from '@ngrx/store';
import { User } from '../../../models/user.model';


export const LoginUserSuccess = createAction(
    '[User API] Login User Successful',
    props<{currentUser: User}>()
)

export const LoginUserError = createAction(
    '[User API] Login User Error',
    props<{err: any}>()
)

export const RegisterUserSuccess = createAction(
    '[User API] Register User Successful',
    props<{currentUser: User}>()
)

export const RegisterUserError = createAction(
    '[User API] Register User Error',
    props<{err: string}>()
)

export const LoadUsers = createAction(
    '[User API] Load All Users',
)

export const LoadUsersSuccess = createAction(
    '[User API] Load All Users Success',
    props<{allUsers: User[]}>()
)

export const LoadUsersError = createAction(
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

