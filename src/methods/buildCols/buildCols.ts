import prepareParam from '@helpers/prepareParam';
import regError from '@helpers/regError';
import calPercentage from '@helpers/calPercentage';
import buildCss from '@helpers/buildCss';

import { ILayouter } from '@/index.d';
import { IBpCals, IBuildCols } from './buildCols.d';

const buildCols = ({ valCols, insertStyles }: IBuildCols) => {
  let cols: number[];
  let bp;
  let bpCals: IBpCals = {};

  const _this = this as unknown as ILayouter;

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  const bpsObj = _this.breakpoints;
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
          cols = [ Number( param ), _this.cols[bp] ];
        }
      } else {
        cols = [ Number( param ), _this.cols.xs ];
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
    instance: _this,
    deep: (insertStyles === undefined ? true : insertStyles)
  });
};

export default buildCols;
