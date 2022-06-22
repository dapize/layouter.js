import { flexAttrsSelf, flexProsAndVals } from '../config/flex';
import getConfig from '../config/main';

import buildCss, { IBpCals } from '../helpers/buildCss';
import { IStyles } from '../helpers/createStyles';
import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';

const buildFlex = (
  valFlex: string,
  insertStyles: boolean = false
): IStyles | Error => {
  let bpCals: IBpCals = {};

  // Getting numbers
  let err: boolean | Error = false;
  const config = getConfig();
  const firstBp = Object.keys(config.breakpoints)[0];

  for (const param of valFlex.split(' ')) {
    let propVal;
    let selectorName = param;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const flexSplited = paramPrepared.numbers.split(':');
    const nameProp = flexSplited[0] as keyof typeof flexProsAndVals; // 'fc' o 'or'
    const valProp = flexSplited[1] as keyof typeof flexProsAndVals; // 'ce' o '1'

    if (!flexAttrsSelf.includes(nameProp)) {
      if (!flexProsAndVals.hasOwnProperty(nameProp)) {
        err = regError('Non-existent Alias', "Don't exists the alias '" + nameProp + "' in Flex vault.");
        break;
      }
      if (!flexProsAndVals.hasOwnProperty(valProp)) {
        err = regError('Non-existent Alias', "Don't exists the alias '" + valProp + "' in Flex vault.");
        break;
      }
      propVal = flexProsAndVals[nameProp] + ':' + flexProsAndVals[valProp];
    } else {
      propVal = flexProsAndVals[nameProp] + ':' + valProp;
    }

    if (paramPrepared.important) propVal += ' !important';

    if (!bpCals.hasOwnProperty(bpNames)) {
      bpCals[bpNames] = {
        name: selectorName,
        value: propVal,
      }
    } else {
      if (selectorName.includes('@')) selectorName = selectorName.split('@')[0];
      let sufixBp = bpNames === firstBp ? '' : '@' + bpNames;
      bpCals[bpNames].name = bpCals[bpNames].name.split('@')[0] + '-' + selectorName + sufixBp;
      bpCals[bpNames].value += ';' + propVal;
    }
  }

  if (err) return err;

  // Building the classNames and the styles to use.
  return buildCss({
    type: 'flex',
    bps: bpCals,
    deep: insertStyles,
  });
};

export default buildFlex;
