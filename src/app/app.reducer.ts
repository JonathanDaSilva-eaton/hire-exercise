import { createReducer, on } from "@ngrx/store";
import { AppActions } from "./app.actions";
import { AppEntity } from "./app.interface";

export const appReducer = createReducer<AppEntity>(
  { percentage: null, loading: false, elements: [] },
  on(AppActions.discover, AppActions.add, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AppActions.discoverSuccess, AppActions.addSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(AppActions.initSuccess, (state, action) => {
    return action.entity;
  })
);
