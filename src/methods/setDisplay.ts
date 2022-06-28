import setAttr from '../helpers/setAttr';

const setDisplay = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['d', 'display'], values);
};

export default setDisplay;
