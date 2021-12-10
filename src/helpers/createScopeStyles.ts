import { ILayouter } from '../index';

export type TInsertion = 'before' | 'after' | 'append';


const createScopeStyles = ( config: ILayouter, bp: string, insertionType: TInsertion, node: HTMLElement ) => {
  let stylesScope = document.getElementById('layouter-' + bp);
  if (!stylesScope) {
    stylesScope = document.createElement('style');
    stylesScope.appendChild(document.createTextNode('')); // WebKit hack :(
    const nodeParent = node.parentNode as HTMLElement;
    switch(insertionType) {
      case 'before':
        nodeParent.insertBefore(stylesScope, node)
        break;
      case 'after':
        node.nextSibling ? nodeParent.insertBefore(stylesScope, node.nextSibling) : nodeParent.appendChild(stylesScope);
        break;
      case 'append':
        node.appendChild(stylesScope);
        break;
    }
    stylesScope.id = 'layouter-' + bp;
  };

  let bridge;
  if (config.bridge) {
    bridge = {
      method: stylesScope.sheet,
      node: stylesScope
    }
  } else {
    bridge = {
      method: {
        insertRule: ruleCss  => {
          ( stylesScope as HTMLElement ).appendChild(document.createTextNode(ruleCss))
        },
        rules: [],
      },
      node: stylesScope
    }
  }
  return bridge;
};

export default createScopeStyles;