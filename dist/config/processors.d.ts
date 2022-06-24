export declare type TDirectiveName = 'cols' | 'pad' | 'padt' | 'padr' | 'padb' | 'padl' | 'mar' | 'mart' | 'marr' | 'marb' | 'marl' | 'flex' | 'mxw' | 'mxh' | 'miw' | 'mih' | 'wdh' | 'hgt';
export interface IProcessor {
    set: string;
    build: string;
    ruleCss: string;
}
export declare const processors: Record<TDirectiveName, IProcessor>;
