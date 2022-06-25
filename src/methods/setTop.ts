import setAttr from './setAttr';

const setTop = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 't', values);
};

export default setTop;
