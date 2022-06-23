import buildAttr from '../helpers/buildAttr';

const buildMarRight = (valMarRight: string, insertStyles = false) => {
  return buildAttr(valMarRight, 'marr', insertStyles);
};

export default buildMarRight;
