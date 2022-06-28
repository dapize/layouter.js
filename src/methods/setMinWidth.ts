import setAttr from '../helpers/setAttr';

const setMinWidth = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['miw', 'min-width'], values);
};

export default setMinWidth;
