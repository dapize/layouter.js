export type TInsertion = 'before' | 'after' | 'append';

export interface IRCreateScopeStyles {
  method:
    | CSSStyleSheet
    | {
        insertRule: (ruleCss: string) => void;
        rules: string[];
      };
  node: HTMLElement;
}