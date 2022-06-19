import buildAttr from "../helpers/buildAttr";

const buildPadLeft = (valPadLeft: string | string[], insertStyles?: boolean) => {
  return buildAttr(valPadLeft, 'padl', insertStyles);
};

export default buildPadLeft;
