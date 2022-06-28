import { IStyles } from "./createStyles";
export interface ISetterPadsXY {
    Node: HTMLElement | Element;
    directives: string[];
    builder: (valPadX: string, insertStyles: boolean) => IStyles;
    vals?: string;
}
declare const setterPadsXY: (data: ISetterPadsXY) => Promise<void | Error>;
export default setterPadsXY;
