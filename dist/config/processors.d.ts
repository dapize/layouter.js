import { IStyles } from '../helpers/createStyles';
export declare type TDirectiveName = 'cols' | 'pad' | 'padt' | 'padr' | 'padb' | 'padl' | 'mar' | 'mart' | 'marr' | 'marb' | 'marl' | 'flex' | 'mxw' | 'mxh' | 'miw' | 'mih' | 'wdh' | 'hgt' | 'pos' | 't' | 'r' | 'b' | 'l';
export interface IProcessor {
    build: (values: string, insertStyles: boolean) => IStyles | Error;
    ruleCss: string;
}
export declare const processors: Record<TDirectiveName, IProcessor>;
