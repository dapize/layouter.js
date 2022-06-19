import buildAttr from "../helpers/buildAttr";

const buildPadRight = (valPadRight: string | string[], insertStyles?: boolean) => {
  return buildAttr(valPadRight, 'padr', insertStyles);
};

export default buildPadRight;
