import setAttr from '../helpers/setAttr';

const setBottom = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['b', 'bottom'], values);
};

export default setBottom;
