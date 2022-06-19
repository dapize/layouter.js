import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';
import calPercentage from '../helpers/calPercentage';

import buildCss from '../helpers/buildCss';
import getConfig from '../config/main';
import { IStyles } from '../helpers/createStyles';

export interface IRBuildCols {
  name: string;
  value: string;
}

export interface IBpCals {
  [bpName: string]: IRBuildCols
}

const buildCols = ( valCols: string | string[], insertStyles: boolean = true ): IStyles => {
  let cols: number[];
  let bp;
  let bpCals: IBpCals = {};
  const config = getConfig();

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  const bpsObj = config.breakpoints;
  if (!Array.isArray(valCols)) valCols = valCols.split(' ');

  valCols.forEach( (param) => {
    selectorName = param;
    paramPrepared = prepareParam(param, bpsObj);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    if (param.includes('/')) {
      const paramSplited = param.split('/');
      cols = [ Number( paramSplited[0] ), Number( paramSplited[1] )];
    } else {
      if (paramPrepared.widthBp) {
        if (bp.includes('-')) {
          regError('SyntaxError', "You can't determine a 'until breakpoint' when use the explicit columns max");
        } else {
          cols = [ Number( param ), config.cols[bp] as number ];
        }
      } else {
        cols = [ Number( param ), config.cols.xs as number ];
      }
    }
    propValue = calPercentage(cols[0], cols[1]);
    if (paramPrepared.important) propValue += ' !important';

    bpCals[bp] = {
      name: selectorName,
      value: propValue
    };
  });

  // Building the classNames and the styles to use.
  return buildCss({
    type: 'cols',
    bps: bpCals,
    deep: insertStyles
  });
};

export default buildCols;
