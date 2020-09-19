import { createFeatureSelector, createSelector } from "@ngrx/store"
import { UserState } from "./user.reducer";

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getLoginError = createSelector(
    getUserFeatureState,
    (state: UserState) => state?.loginError
)

export const getRegisterError = createSelector(
    getUserFeatureState,
    (state: UserState) => state?.registerError
)

export const getAdminStatus = createSelector(
    getUserFeatureState,
    (state: UserState) => state?.isAdmin
)

