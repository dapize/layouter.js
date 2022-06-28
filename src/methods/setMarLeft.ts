import setAttr from '../helpers/setAttr';

const setMarLeft = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['marl', 'ml', 'margin-left'], values);
};

export default setMarLeft;
