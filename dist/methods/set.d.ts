import { TDirectiveName } from '../config/processors';
declare const set: (Node: HTMLElement | Element, parameters?: Partial<Record<TDirectiveName, string>>) => Promise<void | Error>;
export default set;
