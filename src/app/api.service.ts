import { Observable, timer, map, of, takeWhile, tap } from "rxjs";
import { ElementEntity } from "./app.interface";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ApiService {
  private elements: Array<ElementEntity> = [
    { name: "test1", id: "1" },
    { name: "test2", id: "2" },
  ];

  private percent: number = 0;

  public getElements(): Observable<ReadonlyArray<ElementEntity>> {
    return timer(500).pipe(map(() => this.elements));
  }

  public getDiscoveryPercentage(): Observable<number> {
    return timer(200).pipe(map(() => this.percent));
  }

  public discover(): Observable<void> {
    timer(0, 200)
      .pipe(takeWhile((t) => t !== 100, true))
      .subscribe((t) => {
        if (/^\d*0$/.exec(t.toString())) {
          this.percent = t / 100;
        }
        switch (t) {
          case 12:
          case 18:
          case 23:
          case 62:
          case 86:
            this.addElementInCache(`test${t}`);
        }
      });
    return timer(1000).pipe(map(() => undefined));
  }

  public addElement(name: string): Observable<void> {
    return timer(1000).pipe(map(() => this.addElementInCache(name)));
  }

  private addElementInCache(name: string): void {
    const id = `${this.elements.length + 1}`;
    this.elements = [
      ...this.elements,
      {
        id,
        name,
      },
    ];
  }
}
