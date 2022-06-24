import setAttr from './setAttr';

const setWidth = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'wdh', values);
};

export default setWidth;
