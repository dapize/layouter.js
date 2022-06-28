import { IConfig, IConfigUser } from './config/main';
import { IStyles } from './helpers/createStyles';
import { IBuildResult } from './methods/build';
import { TDirectiveName } from './config/processors';
export interface ILayouter extends IConfig {
    getParameters: (Node: HTMLElement | Element) => Partial<Record<TDirectiveName, string>>;
    updateConfig: (userConfig: Partial<Omit<IConfigUser, 'bridge'>>) => IConfig;
    build: (obj: Partial<Record<TDirectiveName, string>>, insertStyles?: boolean) => Partial<IBuildResult> | Error;
    buildCols: (valCols: string, insertStyles?: boolean) => IStyles | Error;
    buildFlex: (valFlex: string, insertStyles?: boolean) => IStyles | Error;
    buildPad: (valPads: string, insertStyles?: boolean) => IStyles;
    buildPadTop: (valPadTop: string, insertStyles?: boolean) => IStyles;
    buildPadRight: (valPadRight: string, insertStyles?: boolean) => IStyles;
    buildPadBottom: (valPadBottom: string, insertStyles?: boolean) => IStyles;
    buildPadLeft: (valPadLeft: string, insertStyles?: boolean) => IStyles;
    buildPadX: (valPadX: string, insertStyles?: boolean) => IStyles;
    buildMar: (valMars: string, insertStyles?: boolean) => IStyles;
    buildMarTop: (valMarTop: string, insertStyles?: boolean) => IStyles;
    buildMarRight: (valMarRight: string, insertStyles?: boolean) => IStyles;
    buildMarBottom: (valMarBottom: string, insertStyles?: boolean) => IStyles;
    buildMarLeft: (valMarLeft: string, insertStyles?: boolean) => IStyles;
    buildMaxWidth: (valMaxWidth: string, insertStyles?: boolean) => IStyles;
    buildMaxHeight: (valMaxHeight: string, insertStyles?: boolean) => IStyles;
    buildMinWidth: (valMinWidth: string, insertStyles?: boolean) => IStyles;
    buildMinHeight: (valMinHeight: string, insertStyles?: boolean) => IStyles;
    buildHeight: (valHeight: string, insertStyles?: boolean) => IStyles;
    buildWidth: (valWidth: string, insertStyles?: boolean) => IStyles;
    buildPosition: (valPosition: string, insertStyles?: boolean) => IStyles | Error;
    buildTop: (valTop: string, insertStyles?: boolean) => IStyles | Error;
    buildRight: (valRight: string, insertStyles?: boolean) => IStyles | Error;
    buildBottom: (valBottom: string, insertStyles?: boolean) => IStyles | Error;
    buildLeft: (valLeft: string, insertStyles?: boolean) => IStyles | Error;
    set: (Node: HTMLElement | Element, parameters?: Partial<Record<TDirectiveName, string>>) => Promise<void | Error>;
    setCols: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setFlex: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMar: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMarTop: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMarRight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMarBottom: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMarLeft: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPad: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPadTop: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPadRight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPadBottom: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPadLeft: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPadX: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPadY: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setWidth: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMinWidth: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMaxWidth: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setHeight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMinHeight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMaxHeight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setPosition: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setTop: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setRight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setBottom: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setLeft: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    insertRules: (objStyles: IStyles) => void;
    reset: (Node: HTMLElement | Element) => Promise<void>;
    version: string;
}
declare global {
    interface Window {
        layouter: ILayouter;
    }
}
declare const layouter: (context: Window & typeof globalThis, userConfig?: Partial<IConfigUser>) => ILayouter;
export default layouter;
