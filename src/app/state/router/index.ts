import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
 
export interface RouterState {
  router: fromRouter.RouterReducerState<any>;
}
 
export const selectRouter = createFeatureSelector<
RouterState,
  fromRouter.RouterReducerState<any>
>('router');
 
export const {
  selectCurrentRoute,   // select the current route
  selectFragment,       // select the current route fragment
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

// export const getCurrentUrl = createSelector(getRouterState, (state: fromRouter.RouterReducerState) => state.state && state.state.url);
