import { createAction, props } from "@ngrx/store";

// Page actions
export const LoginUser = createAction(
    '[User Page] Login User',
    props<{email: string; password: string;}>()
)

export const LogoutUser = createAction(
    '[User Logout] Logout User',
)

export const RegisterUser = createAction(
    '[User Register] Register User',
    props<{firstName: string; lastName: string; email: string; password: string;}>()
)