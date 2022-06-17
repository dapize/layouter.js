export interface IBuildCols {
  valCols: string | string[];
  insertStyles?: boolean;
}

export interface IRBuildCols {
  name: string;
  value: string;
}

export interface IBpCals {
  [bpName: string]: IRBuildCols
}
