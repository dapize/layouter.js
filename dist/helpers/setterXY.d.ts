import { IStyles } from './createStyles';
export interface ISetterXY {
    Node: HTMLElement | Element;
    directives: string[];
    builder: (valPadX: string, insertStyles: boolean) => IStyles;
    vals?: string;
}
declare const setterXY: (data: ISetterXY) => Promise<void | Error>;
export default setterXY;
