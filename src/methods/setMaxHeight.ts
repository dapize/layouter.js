import setAttr from './setAttr';

const setMaxHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'mxh', values);
};

export default setMaxHeight;
