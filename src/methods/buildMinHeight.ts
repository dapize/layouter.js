import buildAttr from '../helpers/buildAttr';

const buildMinHeight = (
  valMinHeight: string | string[],
  insertStyles: boolean = false
) => {
  return buildAttr(valMinHeight, 'mih', insertStyles);
};

export default buildMinHeight;
