import buildAttr from '../helpers/buildAttr';

const buildMinHeight = (
  valMinHeight: string,
  insertStyles = false
) => {
  return buildAttr(valMinHeight, 'mih', insertStyles);
};

export default buildMinHeight;
