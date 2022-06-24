import setAttr from './setAttr';

const setPadLeft = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'padl', values);
};

export default setPadLeft;
