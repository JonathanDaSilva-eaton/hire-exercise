import { Injectable, OnDestroy } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable()
export class Destroy extends ReplaySubject<void> implements OnDestroy {
  public constructor() {
    super();
  }

  public ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
