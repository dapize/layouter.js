import { TDirectiveName } from '../config/processors';
import buildCss, { IBpCals } from './buildCss';
import { IStyles } from './createStyles';
import prepareParam from './prepareParam';
import processedNumber from './processedNumber';

const buildAttr = (
  values: string,
  directive: TDirectiveName,
  insertStyles = false
): IStyles => {
  const bpCals: IBpCals = {};

  values.split(' ').forEach((param) => {
    const paramProcessed = prepareParam(param);
    const bpNames = paramProcessed.breakPoints;

    // processing number values
    let propValue = paramProcessed.numbers
      .split('-')
      .map((n) => processedNumber(n))
      .join(' ');
    if (paramProcessed.important) propValue += ' !important';
    bpCals[bpNames] = {
      name: param,
      value: propValue,
    };
  });

  // Building the classNames and the styles to use.
  return buildCss({
    type: directive,
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildAttr;
