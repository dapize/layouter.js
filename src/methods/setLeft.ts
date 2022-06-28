import setAttr from '../helpers/setAttr';

const setLeft = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['l', 'left'], values);
};

export default setLeft;
