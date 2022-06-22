import setAttr from './setAttr';

const setPads = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'pad', values);
};

export default setPads;
