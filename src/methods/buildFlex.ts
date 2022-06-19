import { flexAttrsSelf, flexProsAndVals } from "../config/flex";
import config from "../config/main";
import buildCss, { IBpCals } from "../helpers/buildCss";
import prepareParam from "../helpers/prepareParam";
import regError from "../helpers/regError";

const buildFlex = (valFlex: string | string[], insertStyles?: boolean) => {
  const { breakpoints } = config();
  let bpNames;
  let bpCals: IBpCals = {};

  // Getting numbers
  let selectorName, paramPrepared, flexSplited,  propVal, nameProp, valProp;
  if (!Array.isArray(valFlex)) valFlex = valFlex.split(' ');
  const bpsObj = breakpoints;
  valFlex.forEach( (param) => {
    selectorName = param;

    paramPrepared = prepareParam(param, bpsObj);
    bpNames = paramPrepared.breakPoints;
    param = paramPrepared.numbers;

    flexSplited = param.split(':');
    nameProp = flexSplited[0];
    valProp = flexSplited[1];
    if (!flexAttrsSelf.includes(nameProp)) { // ignoring the flex attrs selfs
      if (flexProsAndVals.hasOwnProperty(nameProp)) {
        if (flexProsAndVals.hasOwnProperty(valProp)) {
          propVal = flexProsAndVals[nameProp as keyof typeof flexProsAndVals] + ':' + flexProsAndVals[valProp as keyof typeof flexProsAndVals];
        } else {
          return regError('Non-existent Alias', "Don't exists the alias '" + valProp + "' in Flex vault.");
        }
      } else {
        return regError('Non-existent Alias', "Don't exists the alias '" + nameProp + "' in Flex vault.");
      }
    } else {
      propVal = flexProsAndVals[nameProp as keyof typeof flexProsAndVals] + ':' + valProp;
    }

    if (paramPrepared.important) propVal += ' !important';

    if (bpCals.hasOwnProperty(bpNames)) {
      if (selectorName.includes('@')) selectorName = selectorName.split('@')[0];
      bpCals[bpNames].name = bpCals[bpNames].name.split('@')[0] + '-' + selectorName + '@' + bpNames;
      bpCals[bpNames].value += ';' + propVal;
    } else {
      bpCals[bpNames] = {
        name: selectorName,
        value: propVal
      };
    }
  });

  // Building the classNames and the styles to use.
  return buildCss({
    type: 'flex',
    bps: bpCals,
    deep: insertStyles
  });
};

export default buildFlex;
