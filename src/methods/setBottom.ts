import setAttr from './setAttr';

const setBottom = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'b', values);
};

export default setBottom;
