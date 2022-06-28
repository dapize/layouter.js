import setAttr from '../helpers/setAttr';

const setWidth = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['wdh', 'width'], values);
};

export default setWidth;
