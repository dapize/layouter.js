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
    buildPad: (valPads: string, insertStyles?: boolean) => IStyles | boolean;
    buildPadTop: (valPadTop: string, insertStyles?: boolean) => IStyles | boolean;
    buildPadRight: (valPadRight: string, insertStyles?: boolean) => IStyles | boolean;
    buildPadBottom: (valPadBottom: string, insertStyles?: boolean) => IStyles | boolean;
    buildPadLeft: (valPadLeft: string, insertStyles?: boolean) => IStyles | boolean;
    buildMar: (valMars: string, insertStyles?: boolean) => IStyles | boolean;
    buildMarTop: (valMarTop: string, insertStyles?: boolean) => IStyles | boolean;
    buildMarRight: (valMarRight: string, insertStyles?: boolean) => IStyles | boolean;
    buildMarBottom: (valMarBottom: string, insertStyles?: boolean) => IStyles | boolean;
    buildMarLeft: (valMarLeft: string, insertStyles?: boolean) => IStyles | boolean;
    buildMaxWidth: (valMaxWidth: string, insertStyles?: boolean) => IStyles | boolean;
    buildMaxHeight: (valMaxHeight: string, insertStyles?: boolean) => IStyles | boolean;
    buildMinWidth: (valMinWidth: string, insertStyles?: boolean) => IStyles | boolean;
    buildMinHeight: (valMinHeight: string, insertStyles?: boolean) => IStyles | boolean;
    buildHeight: (valHeight: string, insertStyles?: boolean) => IStyles | boolean;
    buildWidth: (valWidth: string, insertStyles?: boolean) => IStyles | boolean;
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
    setWidth: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMinWidth: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMaxWidth: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setHeight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMinHeight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    setMaxHeight: (Node: HTMLElement | Element, values?: string) => Promise<void | Error>;
    insertRules: (objStyles: IStyles) => void;
    reset: (Node: HTMLElement | Element) => Promise<void>;
    version: string;
}
declare global {
    interface Window {
        layouter: ILayouter;
    }
}
declare const layouter: (userConfig?: Partial<IConfigUser>) => ILayouter;
export default layouter;
