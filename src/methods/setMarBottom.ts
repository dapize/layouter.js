import setAttr from '../helpers/setAttr';

const setMarBottom = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['marb', 'mb', 'margin-bottom'], values);
};

export default setMarBottom;
