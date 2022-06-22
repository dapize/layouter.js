import buildAttr from '../helpers/buildAttr';

const buildMinHeight = (
  valMinHeight: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valMinHeight, 'mih', insertStyles);
};

export default buildMinHeight;
