export type TInsertion = 'before' | 'after' | 'append';
export interface ICreateScopeStyles {
    bridge?: boolean;
    bp: string;
    insertionType: TInsertion;
    node: HTMLElement;
    context: Window & typeof globalThis;
}
export interface IRCreateScopeStyles {
    method: CSSStyleSheet | {
        insertRule: (ruleCss: string) => void;
        rules: string[];
    };
    node: HTMLElement;
}
declare const createScopeStyles: ({ bridge: withBridge, bp, insertionType, node, context, }: ICreateScopeStyles) => IRCreateScopeStyles;
export default createScopeStyles;
