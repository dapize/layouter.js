import config, { setStyles } from '../config/main';
import { IStyles } from '../helpers/createStyles';
import getScopeByclassName from '../helpers/getScopeByclassName';

const insertRules = (objStyles: IStyles) => {
  const intConfig = config();

  for (const className in objStyles) {
    if (!intConfig.styles[className]) {
      const nodeScope = getScopeByclassName(className);
      const valClass = objStyles[className];
      const rules = nodeScope.method.rules;
      nodeScope.method.insertRule(valClass, rules ? rules.length : 0);
      setStyles(className, valClass); // saving in styles vault
    }
  }
};

export default insertRules;
