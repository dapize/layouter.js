import setAttr from './setAttr';

const setLeft = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'l', values);
};

export default setLeft;
