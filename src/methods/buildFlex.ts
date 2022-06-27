import { flexAttrsSelf, flexProsAndVals } from '../config/flex';
import getConfig from '../config/main';

import buildCss, { IBpCals } from '../helpers/buildCss';
import { IStyles } from '../helpers/createStyles';
import prepareParam from '../helpers/prepareParam';
import regError from '../helpers/regError';

const buildFlex = (valFlex: string, insertStyles = false): IStyles | Error => {
  const bpCals: IBpCals = {};

  // Getting numbers
  let err: boolean | Error = false;
  const config = getConfig();
  const firstBp = Object.keys(config.breakpoints)[0];

  for (const param of valFlex.split(' ')) {
    let propVal;
    const paramPrepared = prepareParam(param);
    const bpNames = paramPrepared.breakPoints;
    const flexSplited = paramPrepared.numbers.split(':');
    const nameProp = flexSplited[0] as keyof typeof flexProsAndVals; // 'fc' o 'or'
    const valProp = flexSplited[1] as keyof typeof flexProsAndVals; // 'ce' o '1'
    let valAlias: string;

    if (!flexAttrsSelf.includes(nameProp)) {
      if (!flexProsAndVals[nameProp]) {
        err = regError(
          'Non-existent Alias',
          "Don't exists the alias '" + nameProp + "' in Flex vault."
        );
        break;
      }
      if (!flexProsAndVals[valProp]) {
        err = regError(
          'Non-existent Alias',
          "Don't exists the alias '" + valProp + "' in Flex vault."
        );
        break;
      }
      propVal =
        flexProsAndVals[nameProp].ruleCss +
        ':' +
        flexProsAndVals[valProp].ruleCss;
      valAlias = flexProsAndVals[valProp].classPrefix;
    } else {
      propVal = flexProsAndVals[nameProp].ruleCss + ':' + valProp;
      valAlias = valProp;
    }

    let sufixBp = bpNames === firstBp ? '' : '@' + bpNames;
    if (paramPrepared.important) {
      propVal += ' !important';
      sufixBp += '!';
    }

    let selectorName =
      flexProsAndVals[nameProp].classPrefix + ':' + valAlias + sufixBp;

    if (!bpCals[bpNames]) {
      bpCals[bpNames] = {
        name: selectorName,
        value: propVal,
      };
    } else {
      if (selectorName.includes('@')) selectorName = selectorName.split('@')[0]; // just here because will be contact with the other className
      let prevName = bpCals[bpNames].name.split('@')[0];
      if (bpCals[bpNames].name.includes('!') && !prevName.includes('!'))
        prevName += '!';

      bpCals[bpNames].name = prevName + '-' + selectorName + sufixBp;
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
