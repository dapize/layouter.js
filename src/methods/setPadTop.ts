import setAttr from './setAttr';

const setPadTop = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'padt', values);
};

export default setPadTop;
