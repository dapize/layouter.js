import setAttr from '../helpers/setAttr';

const setRight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['r', 'right'], values);
};

export default setRight;
