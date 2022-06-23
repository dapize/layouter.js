import setAttr from './setAttr';

const setMinHeight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, 'mih', values);
};

export default setMinHeight;
