import config from "../config/main";
import { IStyles } from "./createStyles";
import getScopeByclassName from "./getScopeByclassName";

const insertRules = (objStyles: IStyles ) => {
  const { styles } = config();

  for (const className in objStyles) {
    if (!styles.hasOwnProperty(className)) {
      let nodeScope = getScopeByclassName(className);
      const valClass = objStyles[className];
      const rules = nodeScope.method.rules;
      nodeScope.method.insertRule(valClass, (rules ? rules.length : 0));
      styles[className] = valClass; // saving in styles vault
    }
  }
};

export default insertRules;
