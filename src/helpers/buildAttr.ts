import config from '../config/main';
import buildCss, { IBpCals, IPropNode } from './buildCss';
import prepareParam from './prepareParam';
import processedNumber from './processedNumber';

const buildAttr = (
  value: string | string[],
  prop: IPropNode,
  insertStyles: boolean = false
) => {
  const { breakpoints } = config();
  let bpCals: IBpCals = {};
  let paramProcessed, numbersPures, propValue, bps;
  if (!Array.isArray(value)) value = value.split(' ');
  value.forEach(param => {
    paramProcessed = prepareParam(param, breakpoints);
    numbersPures = paramProcessed.numbers;
    bps = paramProcessed.breakPoints;

    // processing number values
    propValue = numbersPures
      .split('-')
      .map( n => {
        return processedNumber(n);
      })
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
