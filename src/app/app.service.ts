import { Injectable } from "@angular/core";
import { AppEntity } from "./app.interface";
import { map, Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({ providedIn: "root" })
export class AppService {
  public constructor(private readonly api: ApiService) {}

  public getEntity(entity: AppEntity): Observable<AppEntity> {
    return this.api.getElements().pipe(
      map((elements) => {
        return {
          ...entity,
          elements,
        };
      })
    );
  }

  public add(name: string): Observable<void> {
    return this.api.addElement(name);
  }

  public discover(): Observable<void> {
    return this.api.discover();
  }
}
