import { IConfig, IConfigUser, setConfig, updateConfig } from "./config/main";
import getParameters, { IParams } from "./methods/getParameters";
import buildCols from "./methods/buildCols";
import { IStyles } from "./helpers/createStyles";

export interface ILayouter extends IConfig {
  getParameters: (Node: HTMLElement) => IParams;
  buildCols: ( valCols: string | string[], insertStyles?: boolean ) => IStyles;
  updateConfig: ( userConfig: Partial<Omit<IConfigUser, 'bridge'>> ) => IConfig;
}

const layouter = ( userConfig: Partial<IConfigUser> = {} ): ILayouter => {
  const config = setConfig( userConfig );

  return {
    ...config,
    getParameters,
    buildCols,
    updateConfig
  }
}

declare global {
  interface Window {
    layouter: typeof layouter;
  }
}

if (window) window.layouter = layouter;

export default layouter;
