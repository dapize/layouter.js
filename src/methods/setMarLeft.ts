import setAttr from './setAttr';

const setMarLeft = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void> => {
  return setAttr(Node, 'marl', values);
};

export default setMarLeft;
