import { ILayouter } from "@/index.d";
import { processors, flexAttrsSelf } from '@core';
import percentageConverter from '@helpers/percentageConverter';
import { IPropNode } from '@helpers/buildCss';
import { IBpCals } from '@methods/buildCols';
import { IStyles } from './createStyles.d';

export const createStyles = (type: IPropNode, bps: IBpCals, instance: ILayouter): IStyles => {
  const sizes = instance.sizes;
  const prefix = instance.prefix;
  const prop = processors[type].ruleCss;
  const styles: IStyles = {};
  let rule, bpSplited, bp1, bp2, direct = false, nameClass, propAndVal, attrsFlexSelfs;
  let shortNameClass: string = '';

  Object.keys(bps).forEach( bp => {
    // preparing the className
    shortNameClass = bps[bp].name;

    // just if have a percentage
    nameClass = shortNameClass;
    if (shortNameClass.includes('%')) nameClass = shortNameClass.replace(shortNameClass, percentageConverter(shortNameClass))
    nameClass = prefix + type + '-' + nameClass.replace(/\//g, '\\/').replace(/:/g, '\\:').replace('@', '\\@').split('.').join('_');

    // Property and value
    if (type === 'flex') {
      propAndVal = bps[bp].value;

      // Searching a flex self inside. ['as' for 'align-self']
      attrsFlexSelfs = ['as'].concat(flexAttrsSelf).filter(( nameAttrFlex ) => ( shortNameClass.includes(nameAttrFlex + ':') ));
      if (attrsFlexSelfs.length) {
        // if the items number of flex selft (+1) is diferrent so exists other flex attribute
        if ((attrsFlexSelfs.length + 1) !== shortNameClass.split(':').length) {
          propAndVal += shortNameClass.includes('!') ? ';display:flex !important;' : ';display:flex;';
        }
      } else {
        propAndVal += shortNameClass.includes('!') ? ';display:flex !important;' : ';display:flex;';
      }
    } else {
      propAndVal = prop +  ':' + bps[bp].value;
    }

    rule = '@media screen and ';
    if (!bp.includes('-')) { // no tiene until
      if (sizes[bp]) {
        rule += '(min-width: ' + sizes[bp] + 'px)';
      } else {
        rule = '.' + nameClass.replace(/!/g, '\\!') + '{' + propAndVal + '}';
        direct = true;
      }
    } else {
      bpSplited = bp.split('-');
      bp1 = bpSplited[0];
      if (bp1) rule += '(min-width: ' + sizes[bp1] + 'px) and ';
      bp2 = bpSplited[1];
      rule += '(max-width: ' + (sizes[bp2] - 1) + 'px)';
    }

    if (!direct) rule += '{.' + nameClass.replace(/!/g, '\\!') + '{' + propAndVal + '}}';
    direct = false;
    styles[nameClass] = rule;
  });

  return styles;
};
