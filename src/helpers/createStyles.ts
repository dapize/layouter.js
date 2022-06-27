import { flexAttrsSelf } from '../config/flex';
import config from '../config/main';
import { processors, TDirectiveName } from '../config/processors';
import { IBpCals } from './buildCss';
import percentageConverter from './percentageConverter';

export interface IStyles {
  [name: string]: string;
}

const createStyles = (directive: TDirectiveName, bps: IBpCals): IStyles => {
  const intConfig = config();
  const sizes = intConfig.sizes;
  const prefix = intConfig.prefix;
  const prop = processors[directive].ruleCss;
  const styles: IStyles = {};

  Object.keys(bps).forEach((bp) => {
    // preparing the className
    const shortNameClass = bps[bp].name;

    // just if have a percentage
    let nameClass = shortNameClass;
    if (shortNameClass.includes('%')) {
      nameClass = shortNameClass.replace(
        shortNameClass,
        percentageConverter(shortNameClass)
      );
    }

    const finalPrefix = prefix ? prefix + '-' : '';
    nameClass =
      finalPrefix +
      processors[directive].classPrefix +
      '-' +
      nameClass
        .replace(/\//g, '\\/')
        .replace(/:/g, '\\:')
        .replace('@', '\\@')
        .split('.')
        .join('_');

    if (!intConfig.styles[nameClass]) {
      // Property and value
      let propAndVal;
      if (directive === 'flex') {
        propAndVal = bps[bp].value;
        const flexImportant = shortNameClass.includes('!')
          ? ';display:flex !important;'
          : ';display:flex;';

        // Searching a flex self inside. ['as' for 'align-self']
        const attrsFlexSelfs = flexAttrsSelf.filter((nameAttrFlex) =>
          shortNameClass.includes(nameAttrFlex + ':')
        );
        if (attrsFlexSelfs.length) {
          // if the items number of flex selft (+1) is diferrent so exists other flex attribute. Example: as:ce jc:ce
          if (attrsFlexSelfs.length + 1 !== shortNameClass.split(':').length) {
            propAndVal += flexImportant;
          }
        } else {
          propAndVal += flexImportant;
        }
      } else {
        propAndVal = prop + ':' + bps[bp].value;
      }

      let rule = '@media screen and ';
      let direct = false;
      if (!bp.includes('-')) {
        // no tiene until
        if (sizes[bp]) {
          rule += '(min-width: ' + sizes[bp] + 'px)';
        } else {
          rule = '.' + nameClass.replace(/!/g, '\\!') + '{' + propAndVal + '}';
          direct = true;
        }
      } else {
        const bpSplited = bp.split('-');
        const bp1 = bpSplited[0];
        if (bp1) rule += '(min-width: ' + sizes[bp1] + 'px) and ';
        const bp2 = bpSplited[1];
        rule += '(max-width: ' + (sizes[bp2] - 1) + 'px)';
      }

      if (!direct) {
        rule += '{.' + nameClass.replace(/!/g, '\\!') + '{' + propAndVal + '}}';
      }

      styles[nameClass] = rule;
    } else {
      styles[nameClass] = intConfig.styles[nameClass];
    }
  });
  return styles;
};

export default createStyles;
