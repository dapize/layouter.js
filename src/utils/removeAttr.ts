export const removeProp = (
  Node: HTMLElement | Element,
  propName: string
): Promise<void> => {
  return new Promise(resolve => {
    if (!Node.hasAttribute(propName)) {
      resolve();
      return;
    }
    const obsNode = new MutationObserver(() => {
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
  propNames: string[]
): Promise<void> => {
  return new Promise(resolve => {
    const promises = propNames.map(name => removeProp(Node, name));
    Promise.all(promises).then(() => resolve());
  });
};

const removeAttr = (
  Node: HTMLElement | Element,
  propNames: string | string[]
): Promise<void> => {
  return new Promise(resolve => {
    if (Array.isArray(propNames)) {
      removeProps(Node, propNames).then(resolve);
    } else {
      removeProp(Node, propNames).then(resolve);
    }
  });
};

export default removeAttr;
