import setAttr from './setAttr';

const setPadRight = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'padr', values);
};

export default setPadRight;
