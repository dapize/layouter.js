import buildAttr from "../helpers/buildAttr";

const buildPadBottom = (valPadBottom: string | string[], insertStyles?: boolean) => {
  return buildAttr(valPadBottom, 'padb', insertStyles);
};

export default buildPadBottom;
