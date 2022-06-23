import setAttr from './setAttr';

const setMarBottom = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'marb', values);
};

export default setMarBottom;
