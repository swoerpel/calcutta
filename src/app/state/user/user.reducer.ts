import { User } from "../../models/user.model";
import { createReducer, on } from "@ngrx/store";
import { UserAPIActions, UserPageActions } from "./actions";
export interface UserState {
    currentUser: User;
    allUsers: User[],
    isAdmin: boolean;

    loginError: any;
    registerError: any;
    loadUsersError: any;
}

const initialState: UserState = {
    currentUser: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        maxBetValue: 0,
    },
    allUsers: null,
    isAdmin: false,

    loginError: null,
    registerError: null,
    loadUsersError: null,
}

export const userReducer = createReducer<UserState>(
    initialState,
    //==========================================================
    on(UserPageActions.LoginUser, (state): UserState => {
        return {
            ...state,
            loginError: null,
        }
    }),
    on(UserAPIActions.LoginUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.currentUser,
            loginError: null,
        }
    }),
    on(UserAPIActions.LoginUserError, (state, action): UserState => {
        return {
            ...state,
            loginError: action.err
        }
    }),
    //==========================================================
    on(UserPageActions.RegisterUser, (state): UserState => {
        return {
            ...state,
            registerError: null,
        }
    }),
    on(UserAPIActions.RegisterUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.currentUser,
            registerError: null,
        }
    }),
    on(UserAPIActions.RegisterUserError, (state, action): UserState => {
        return {
            ...state,
            registerError: action.err
        }
    }),
    //==========================================================
    on(UserAPIActions.LoadUsers, (state): UserState => {
        return {
            ...state,
            loadUsersError: null,
        }
    }),
    on(UserAPIActions.LoadUsersSuccess, (state, action): UserState => {
        return {
            ...state,
            allUsers: action.allUsers,
            loadUsersError: null,
        }
    }),
    on(UserAPIActions.LoadUsersError, (state, action): UserState => {
        return {
            ...state,
            loadUsersError: action.err
        }
    }),
    //==========================================================
    on(UserAPIActions.AssignUserPrivileges, (state, action): UserState => {
        return {
            ...state,
            isAdmin: action.isAdmin
        }
    }),
    //==========================================================
)