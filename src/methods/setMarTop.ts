import setAttr from './setAttr';

const setMarTop = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'mart', values);
};

export default setMarTop;
