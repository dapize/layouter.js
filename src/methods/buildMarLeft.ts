import buildAttr from "../helpers/buildAttr";

const buildMarLeft = (valMarLeft: string | string[], insertStyles?: boolean) => {
  return buildAttr(valMarLeft, 'marl', insertStyles);
};

export default buildMarLeft;
