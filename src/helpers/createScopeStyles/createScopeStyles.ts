import { IConfig } from '../../config';
import { TInsertion, IRCreateScopeStyles } from './createScopeStyles.d';

const createScopeStyles = (
  config: IConfig,
  bp: string,
  insertionType: TInsertion,
  node: HTMLElement
): IRCreateScopeStyles => {
  let stylesScope = document.getElementById('layouter-' + bp);
  if (!stylesScope) {
    stylesScope = document.createElement('style');
    stylesScope.appendChild(document.createTextNode('')); // WebKit hack :(
    const nodeParent = node.parentNode as HTMLDivElement;
    switch (insertionType) {
      case 'before':
        nodeParent.insertBefore(stylesScope, node);
        break;
      case 'after':
        node.nextSibling
          ? nodeParent.insertBefore(stylesScope, node.nextSibling)
          : nodeParent.appendChild(stylesScope);
        break;
      case 'append':
        node.appendChild(stylesScope);
        break;
    }
    stylesScope.id = 'layouter-' + bp;
  }

  let bridge: IRCreateScopeStyles;
  if (config.bridge) {
    bridge = {
      method: (stylesScope as HTMLStyleElement).sheet as CSSStyleSheet,
      node: stylesScope,
    };
  } else {
    bridge = {
      method: {
        insertRule: (ruleCss: string) => {
          (stylesScope as HTMLDivElement).appendChild(
            document.createTextNode(ruleCss)
          );
        },
        rules: [],
      },
      node: stylesScope,
    };
  }
  return bridge;
};

export default createScopeStyles;
