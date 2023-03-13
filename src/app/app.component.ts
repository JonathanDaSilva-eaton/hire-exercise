import { Component } from "@angular/core";
import { AppActions } from "./app.actions";
import { ActionsSubject, Store } from "@ngrx/store";
import { FormControl } from "@angular/forms";
import { Observable, takeUntil } from "rxjs";
import { AppEntity } from "./app.interface";
import { Destroy } from "./destroy";
import { ofType } from "@ngrx/effects";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Destroy],
})
export class AppComponent {
  protected readonly entity$: Observable<AppEntity>;
  protected readonly name = new FormControl<string>("");

  public constructor(
    private readonly store: Store,
    private readonly onDestroy$: Destroy,
    private readonly actions$: ActionsSubject
  ) {
    this.store.dispatch(AppActions.init());

    this.entity$ = this.store.select((state: any) => state.app);

    this.actions$
      .pipe(ofType(AppActions.addSuccess), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.name.reset();
      });
  }

  public add(): void {
    this.store.dispatch(
      AppActions.add({
        text: this.name.value ?? "",
      })
    );
  }

  public discover(): void {
    this.store.dispatch(AppActions.discover());
  }
}
