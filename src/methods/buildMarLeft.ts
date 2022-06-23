import buildAttr from '../helpers/buildAttr';

const buildMarLeft = (
  valMarLeft: string,
  insertStyles = false
) => {
  return buildAttr(valMarLeft, 'marl', insertStyles);
};

export default buildMarLeft;
