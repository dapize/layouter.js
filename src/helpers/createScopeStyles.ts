export type TInsertion = 'before' | 'after' | 'append';

export interface ICreateScopeStyles {
  bridge?: boolean;
  bp: string;
  insertionType: TInsertion;
  node: HTMLElement;
  context: Window & typeof globalThis;
}

export interface IRCreateScopeStyles {
  method:
    | CSSStyleSheet
    | {
        insertRule: (ruleCss: string) => void;
        rules: string[];
      };
  node: HTMLElement;
}

const createScopeStyles = ({
  bridge: withBridge,
  bp,
  insertionType,
  node,
  context,
}: ICreateScopeStyles): IRCreateScopeStyles => {
  let stylesScope = context.document.getElementById('layouter-' + bp);
  if (!stylesScope) {
    stylesScope = context.document.createElement('style');
    stylesScope.appendChild(context.document.createTextNode('')); // WebKit hack :(
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
  if (withBridge) {
    bridge = {
      method: (stylesScope as HTMLStyleElement).sheet as CSSStyleSheet,
      node: stylesScope,
    };
  } else {
    bridge = {
      method: {
        insertRule: (ruleCss: string) => {
          (stylesScope as HTMLDivElement).appendChild(
            context.document.createTextNode(ruleCss)
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
