export interface AppEntity {
  loading: boolean;
  percentage: number | null;
  elements: ReadonlyArray<ElementEntity>;
}

export interface ElementEntity {
  id: string;
  name: string;
}
