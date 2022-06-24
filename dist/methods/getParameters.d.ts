import { TDirectiveName } from '../config/processors';
declare const getParameters: (Node: HTMLElement | Element) => Partial<Record<TDirectiveName, string>>;
export default getParameters;
