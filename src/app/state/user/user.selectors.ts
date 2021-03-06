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

export const GetCurrentUser = createSelector(
    getUserFeatureState,
    (state: UserState) => {
        state.currentUser
        return state?.allUsers?.find((u) => u.id === state.currentUser.id)
    }
)

export const GetUserFullName = createSelector(
    getUserFeatureState,
    (state: UserState, props: any) => {
        if(props.userId === ''){
            return {
                firstName: 'No Max',
                lastName: 'Bet'
            }
        }
        const user = state?.allUsers?.find((u) => u?.id === props.userId);
        return {
            firstName: user.firstName,
            lastName: user.lastName,
        } 
    }
)

