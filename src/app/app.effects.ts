import { Injectable } from "@angular/core";
import { AppActions } from "./app.actions";
import {
  combineLatest,
  exhaustMap,
  map,
  switchMap,
  of,
  mergeMap,
  take,
} from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppService } from "./app.service";
import { Store } from "@ngrx/store";

@Injectable()
export class AppEffects {
  public readonly init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.init),
      switchMap((action) => {
        return combineLatest({
          action: of(action),
          entity: this.store.select((state: any) => state.app),
        }).pipe(take(1));
      }),
      switchMap(({ entity }) => {
        return this.appService.getEntity(entity);
      }),
      map((entity) => AppActions.initSuccess({ entity }))
    );
  });

  public readonly add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.add),
      mergeMap(({ text }) => {
        return this.appService.add(text);
      }),
      map(() => AppActions.addSuccess())
    );
  });

  public readonly discover$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.discover),
      exhaustMap(() => {
        return this.appService.discover();
      }),
      map(() => AppActions.discoverSuccess())
    );
  });

  public constructor(
    private readonly actions$: Actions,
    private readonly appService: AppService,
    private readonly store: Store
  ) {}
}
