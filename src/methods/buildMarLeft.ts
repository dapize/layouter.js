import buildAttr from "../helpers/buildAttr";

const buildMarLeft = (valMarLeft: string | string[], insertStyles: boolean = false) => {
  return buildAttr(valMarLeft, 'marl', insertStyles);
};

export default buildMarLeft;
