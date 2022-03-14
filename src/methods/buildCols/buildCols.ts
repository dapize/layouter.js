import prepareParam from '../../helpers/prepareParam';
import regError from '../../helpers/regError';
import calPercentage from '../../helpers/calPercentage';
import Layouter from '../../index';
import { IBpCals } from './buildCols.d';


const buildCols = (valCols: string | string[], insertStyles?: boolean) => {
  let cols: number[];
  let bp;
  let bpCals:IBpCals = {};

  const _this = this as typeof Layouter;

  // Getting numbers
  let selectorName, propValue, paramPrepared;
  const bpsObj = _this.breakpoints;
  if (!Array.isArray(valCols)) valCols = valCols.split(' ');
  valCols.forEach( (param) => {
    selectorName = param;
    paramPrepared = prepareParam(param, bpsObj);
    bp = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    if (param.indexOf('/') !== -1) {
      const paramSplited = param.split('/');
      cols = [ Number( paramSplited[0] ), Number( paramSplited[1] )];
    } else {
      if (paramPrepared.widthBp) {
        if (bp.indexOf('-') === -1) {
          cols = [param, _this.cols[bp]];
        } else {
          regError('SyntaxError', "You can't determine a 'until breakpoint' when use the explicit columns max");
        }
      } else {
        cols = [param, _this.cols.xs];
      }
    }
    propValue = calPercentage(cols[0], cols[1]);
    if (paramPrepared.important) propValue += ' !important';

    bpCals[bp] = {
      name: selectorName,
      value: propValue
    };
  });

  /* // Building the classNames and the styles to use.
  return buildCss({
    type: 'cols',
    bps: bpCals,
    instance: this,
    deep: (insertStyles === undefined ? true : insertStyles)
  }); */
};


  export default buildCols;