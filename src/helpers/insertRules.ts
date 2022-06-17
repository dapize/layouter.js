import { ILayouter } from "@/index.d";
import { IStyles } from '@helpers/createStyles';
import regError from "@helpers/regError";
import getScopeByclassName from "@helpers/getScopeByclassName";

const insertRules = (objStyles: IStyles, instance: ILayouter) => {
  Object.keys(objStyles).forEach( className => {
    if (!instance.styles.hasOwnProperty(className)) {
      let nodeScope = getScopeByclassName(className, instance);
      if (nodeScope !== undefined) {
        nodeScope.method.insertRule(objStyles[className], (nodeScope.method.rules ? nodeScope.method.rules.length : 0));
        instance.styles[className] = objStyles[className]; // saving in styles vault
      } else {
        regError('Dont exists scope', "Don't exists a scope valid for '" + className + "'");
      }
    }
  });
};

export default insertRules;
