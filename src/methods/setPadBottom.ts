import setAttr from './setAttr';

const setPadBottom = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'padb', values);
};

export default setPadBottom;
