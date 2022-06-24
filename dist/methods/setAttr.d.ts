import { TDirectiveName } from '../config/processors';
declare const setAttr: (Node: HTMLElement | Element, directive: TDirectiveName, values?: string | undefined) => Promise<void | Error>;
export default setAttr;
