import getConfig from '../config/main';

export const removeProp = (
  Node: HTMLElement | Element,
  propName: string,
  context: Window & typeof globalThis
): Promise<void> => {
  return new Promise((resolve) => {
    if (!Node.hasAttribute(propName)) {
      resolve();
      return;
    }
    const obsNode = new context.MutationObserver(() => {
      obsNode.disconnect();
      resolve();
    });
    obsNode.observe(Node, {
      childList: false,
      subtree: false,
      attributes: true,
      attributeFilter: [propName],
      characterData: false,
    });
    Node.removeAttribute(propName);
  });
};

export const removeProps = (
  Node: HTMLElement | Element,
  propNames: string[],
  context: Window & typeof globalThis
): Promise<void> => {
  return new Promise((resolve) => {
    const promises = propNames.map((name) => removeProp(Node, name, context));
    Promise.all(promises).then(() => resolve());
  });
};

const removeAttr = (
  Node: HTMLElement | Element,
  propNames: string | string[]
): Promise<void> => {
  return new Promise((resolve) => {
    const config = getConfig();
    if (Array.isArray(propNames)) {
      removeProps(Node, propNames, config.context).then(resolve);
    } else {
      removeProp(Node, propNames, config.context).then(resolve);
    }
  });
};

export default removeAttr;
