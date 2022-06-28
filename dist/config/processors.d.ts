import { IStyles } from '../helpers/createStyles';
declare type TDirectiveNameBase = 'cols' | 'pad' | 'padt' | 'padr' | 'padb' | 'padl' | 'padx' | 'pady' | 'mar' | 'mart' | 'marr' | 'marb' | 'marl' | 'flex' | 'mxw' | 'mxh' | 'miw' | 'mih' | 'wdh' | 'hgt' | 'pos' | 't' | 'r' | 'b' | 'l' | 'd';
declare type TDirectiveNameExtended = 'c' | 'fx' | 'p' | 'padding' | 'pt' | 'padding-top' | 'pr' | 'padding-right' | 'pb' | 'padding-bottom' | 'pl' | 'padding-left' | 'py' | 'px' | 'm' | 'margin' | 'mt' | 'margin-top' | 'mr' | 'margin-right' | 'mb' | 'margin-bottom' | 'ml' | 'margin-left' | 'w' | 'width' | 'h' | 'height' | 'max-width' | 'max-height' | 'min-width' | 'min-height' | 'position' | 'top' | 'right' | 'bottom' | 'left' | 'display';
export declare type TDirectiveName = TDirectiveNameBase | TDirectiveNameExtended;
export interface IProcessor {
    build: (values: string, insertStyles: boolean) => IStyles | Error;
    ruleCss: string | string[];
    classPrefix: string;
}
export declare const processors: Record<TDirectiveName, IProcessor>;
export {};
