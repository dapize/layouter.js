import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';
import calPercentage from '../helpers/calPercentage';

import buildCss, { IBpCals } from '../helpers/buildCss';
import getConfig from '../config/main';
import { IStyles } from '../helpers/createStyles';
import breakpointsOrdered from '../helpers/breakpointsOrdered';

const buildCols = (
  valCols: string | string[],
  insertStyles: boolean = false
): IStyles | boolean => {
  let cols: number[];
  let bp;
  let bpCals: IBpCals = {};
  const config = getConfig();

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  const bpsObj = config.breakpoints;
  if (!Array.isArray(valCols)) valCols = valCols.split(' ');

  let builded: boolean = true;
  const arrBps = breakpointsOrdered(bpsObj);

  for (const item in valCols) {
    let param = valCols[item];
    selectorName = param;
    paramPrepared = prepareParam(param, bpsObj);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    if (param.includes('/')) {
      const paramSplited = param.split('/');
      cols = [Number(paramSplited[0]), Number(paramSplited[1])];
    } else {
      if (paramPrepared.widthBp) {
        if (bp.includes('-')) {
          regError(
            'SyntaxError',
            "You can't determine a 'until breakpoint' when use the explicit columns max"
          );
          builded = false;
          break;
        } else {
          cols = [Number(param), config.cols[bp] as number];
        }
      } else {
        cols = [Number(param), config.cols[arrBps[0]] as number];
      }
    }

    propValue = calPercentage(cols[0], cols[1]);
    if (paramPrepared.important) propValue += ' !important';

    bpCals[bp] = {
      name: selectorName,
      value: propValue,
    };
  }

  if (!builded) return builded;

  // Building the classNames and the styles to use.
  return buildCss({
    type: 'cols',
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildCols;
