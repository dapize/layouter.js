import { IStyles } from '../helpers/createStyles';
type TDirectiveNameBase = 'cols' | 'pad' | 'padt' | 'padr' | 'padb' | 'padl' | 'padx' | 'pady' | 'mar' | 'mart' | 'marr' | 'marb' | 'marl' | 'marx' | 'mary' | 'flex' | 'mxw' | 'mxh' | 'miw' | 'mih' | 'wdh' | 'hgt' | 'pos' | 't' | 'r' | 'b' | 'l' | 'd';
type TDirectiveNameExtended = 'c' | 'fx' | 'p' | 'padding' | 'pt' | 'padding-top' | 'pr' | 'padding-right' | 'pb' | 'padding-bottom' | 'pl' | 'padding-left' | 'py' | 'padding-y' | 'px' | 'padding-x' | 'my' | 'margin-y' | 'mx' | 'margin-x' | 'm' | 'margin' | 'mt' | 'margin-top' | 'mr' | 'margin-right' | 'mb' | 'margin-bottom' | 'ml' | 'margin-left' | 'w' | 'width' | 'h' | 'height' | 'max-width' | 'max-height' | 'min-width' | 'min-height' | 'position' | 'top' | 'right' | 'bottom' | 'left' | 'display';
export type TDirectiveName = TDirectiveNameBase | TDirectiveNameExtended;
export interface IProcessor {
    build: (values: string, insertStyles: boolean) => IStyles | Error;
    ruleCss: string | string[];
    classPrefix: string;
}
export declare const processors: Record<TDirectiveName, IProcessor>;
export {};
