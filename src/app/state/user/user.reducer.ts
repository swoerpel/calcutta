import { User } from "../../models/user.model";
import { createReducer, on } from "@ngrx/store";
import { UserAPIActions, UserPageActions } from "./actions";
export interface UserState {
    currentUser: User;
    loginError: any;
    registerError: any;
    isAdmin: boolean;
}

const initialState: UserState = {
    currentUser: {
        uid: '',
        displayName: '',
        email: '',
    },
    loginError: null,
    registerError: null,
    isAdmin: false,
}

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserPageActions.LoginUser, (state): UserState => {
        return {
            ...state,
            loginError: null,
        }
    }),
    on(UserPageActions.RegisterUser, (state): UserState => {
        return {
            ...state,
            registerError: null,
        }
    }),


    on(UserAPIActions.LoginUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user,
            loginError: null,
        }
    }),
    on(UserAPIActions.LoginUserError, (state, action): UserState => {
        return {
            ...state,
            loginError: action.err
        }
    }),

    on(UserAPIActions.RegisterUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user,
            registerError: null,
        }
    }),
    on(UserAPIActions.RegisterUserError, (state, action): UserState => {
        return {
            ...state,
            registerError: action.err
        }
    }),

    on(UserAPIActions.AssignUserPrivileges, (state, action): UserState => {
        return {
            ...state,
            isAdmin: action.isAdmin
        }
    }),
)