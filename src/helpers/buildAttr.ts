import config from '../config/main';
import { TDirectiveName } from '../config/processors';
import buildCss, { IBpCals } from './buildCss';
import prepareParam from './prepareParam';
import processedNumber from './processedNumber';

const buildAttr = (
  values: string,
  prop: TDirectiveName,
  insertStyles: boolean = false
) => {
  const intConfig = config();
  let bpCals: IBpCals = {};

  values.split(' ').forEach(param => {
    const paramProcessed = prepareParam(param, intConfig.breakpoints);
    const bps = paramProcessed.breakPoints;

    // processing number values
    let propValue = paramProcessed.numbers
      .split('-')
      .map(n => processedNumber(n))
      .join(' ');
    if (paramProcessed.important) propValue += ' !important';
    if (bpCals.hasOwnProperty(bps)) {
      bpCals[bps].value += ';' + propValue;
    } else {
      bpCals[bps] = {
        name: param,
        value: propValue,
      };
    }
  });

  // Building the classNames and the styles to use.
  return buildCss({
    type: prop,
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildAttr;
