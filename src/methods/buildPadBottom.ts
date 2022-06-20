import buildAttr from "../helpers/buildAttr";

const buildPadBottom = (valPadBottom: string | string[], insertStyles: boolean = false) => {
  return buildAttr(valPadBottom, 'padb', insertStyles);
};

export default buildPadBottom;
