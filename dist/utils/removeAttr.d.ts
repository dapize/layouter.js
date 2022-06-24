export declare const removeProp: (Node: HTMLElement | Element, propName: string) => Promise<void>;
export declare const removeProps: (Node: HTMLElement | Element, propNames: string[]) => Promise<void>;
declare const removeAttr: (Node: HTMLElement | Element, propNames: string | string[]) => Promise<void>;
export default removeAttr;
