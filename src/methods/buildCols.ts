import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';
import calPercentage from '../helpers/calPercentage';

import buildCss, { IBpCals } from '../helpers/buildCss';
import getConfig from '../config/main';
import { IStyles } from '../helpers/createStyles';

const buildCols = (values: string, insertStyles = false): IStyles | Error => {
  let cols: number[];
  let bp;
  const bpCals: IBpCals = {};
  const config = getConfig();

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  const directBp = Object.keys(config.breakpoints)[0];

  let err: boolean | Error = false;

  for (const item of values.split(' ')) {
    let param = item;
    selectorName = param;
    paramPrepared = prepareParam(param);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    if (param.includes('/')) {
      const paramSplited = param.split('/');
      cols = [Number(paramSplited[0]), Number(paramSplited[1])];
    } else {
      if (paramPrepared.widthBp) {
        if (bp.includes('-')) {
          err = regError(
            'SyntaxError',
            "You can't determine a 'until breakpoint' when use the explicit columns max: " +
              values
          );
          break;
        } else {
          cols = [Number(param), config.cols[bp] as number];
        }
      } else {
        cols = [Number(param), config.cols[directBp] as number];
      }
    }

    propValue = calPercentage(cols[0], cols[1]);
    if (paramPrepared.important) propValue += ' !important';

    bpCals[bp] = {
      name: selectorName,
      value: propValue,
    };
  }

  if (err) return err;

  // Building the classNames and the styles to use.
  return buildCss({
    type: 'cols',
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildCols;
