import getConfig from '../config/main';
import { positionProsAndVals } from '../config/position';

import buildCss, { IBpCals } from '../helpers/buildCss';
import { IStyles } from '../helpers/createStyles';
import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';

const buildPosition = (
  valPos: string,
  insertStyles = false
): IStyles | Error => {
  const bpCals: IBpCals = {};

  // Getting numbers
  let err: boolean | Error = false;
  const config = getConfig();
  const firstBp = Object.keys(config.breakpoints)[0];

  for (const param of valPos.split(' ')) {
    let propVal;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const nameProp = paramPrepared.numbers as keyof typeof positionProsAndVals;

    if (!positionProsAndVals[nameProp]) {
      err = regError(
        'Non-existent Alias',
        "Don't exists the alias '" + nameProp + "' in Position vault."
      );
      break;
    }

    propVal = positionProsAndVals[nameProp].ruleCss;
    const className = positionProsAndVals[nameProp].classPrefix;

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
    type: 'pos',
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildPosition;
