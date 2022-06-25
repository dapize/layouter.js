import setAttr from './setAttr';

const setRight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'r', values);
};

export default setRight;
