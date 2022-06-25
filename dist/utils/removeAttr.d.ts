export declare const removeProp: (Node: HTMLElement | Element, propName: string, context: Window & typeof globalThis) => Promise<void>;
export declare const removeProps: (Node: HTMLElement | Element, propNames: string[], context: Window & typeof globalThis) => Promise<void>;
declare const removeAttr: (Node: HTMLElement | Element, propNames: string | string[]) => Promise<void>;
export default removeAttr;
