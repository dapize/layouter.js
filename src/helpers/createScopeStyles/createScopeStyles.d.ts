export type TInsertion = 'before' | 'after' | 'append';

export interface ICreateScopeStyles {
  bridge?: boolean;
  bp: string;
  insertionType: TInsertion;
  node: HTMLElement;
}

export interface IRCreateScopeStyles {
  method:
    | CSSStyleSheet
    | {
        insertRule: (ruleCss: string) => void;
        rules: string[];
      };
  node: HTMLElement;
}
