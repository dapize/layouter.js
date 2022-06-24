import setAttr from './setAttr';

const setMarRight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'marr', values);
};

export default setMarRight;
