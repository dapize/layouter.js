import getConfig from '../config/main';
import { displayProsAndVals } from '../config/display';

import buildCss, { IBpCals } from '../helpers/buildCss';
import { IStyles } from '../helpers/createStyles';
import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';

const buildDisplay = (
  valDisplay: string,
  insertStyles = false
): IStyles | Error => {
  const bpCals: IBpCals = {};

  // Getting numbers
  let err: boolean | Error = false;
  const config = getConfig();
  const firstBp = Object.keys(config.breakpoints)[0];

  for (const param of valDisplay.split(' ')) {
    let propVal;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const nameProp = paramPrepared.numbers as keyof typeof displayProsAndVals;

    if (!displayProsAndVals[nameProp]) {
      err = regError(
        'Non-existent Alias',
        "Don't exists the alias '" + nameProp + "' in display vault."
      );
      break;
    }

    propVal = displayProsAndVals[nameProp].ruleCss;
    const className = displayProsAndVals[nameProp].classPrefix;

    let sufixBp = bpNames === firstBp ? '' : '@' + bpNames;

    if (paramPrepared.important) {
      propVal += ' !important';
      sufixBp += '!';
    }

    bpCals[bpNames] = {
      name: className + sufixBp,
      value: propVal,
    };
  }

  if (err) return err;

  // Building the classNames and the styles to use.
  return buildCss({
    type: 'd',
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildDisplay;
