import setAttr from '../helpers/setAttr';

const setPosition = (
  Node: HTMLElement | Element,
  values?: string
): Promise<void | Error> => {
  return setAttr(Node, ['pos', 'position'], values);
};

export default setPosition;
