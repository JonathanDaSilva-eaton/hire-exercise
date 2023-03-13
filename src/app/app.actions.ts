import { createAction, props } from "@ngrx/store";
import { AppEntity } from "./app.interface";

export namespace AppActions {
  export const init = createAction("[AppActions] init");

  export const initSuccess = createAction(
    "[AppActions] initSuccess",
    props<{ entity: AppEntity }>()
  );

  export const add = createAction(
    "[AppActions] add",
    props<{ text: string }>()
  );

  export const addSuccess = createAction("[AppActions] addSuccess");

  export const discover = createAction("[AppActions] discovery");

  export const discoverSuccess = createAction("[AppActions] discoverySuccess");
}
