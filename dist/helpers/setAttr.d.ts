import { TDirectiveName } from '../config/processors';
declare const setAttr: (Node: HTMLElement | Element, directives: TDirectiveName[], vals?: string) => Promise<void | Error>;
export default setAttr;
