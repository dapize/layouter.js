import setAttr from './setAttr';

const setMaxWidth = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'mxw', values);
};

export default setMaxWidth;
