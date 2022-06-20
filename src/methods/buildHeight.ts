import buildAttr from "../helpers/buildAttr";

const buildHeight = (valHeight: string | string[], insertStyles: boolean = false) => {
  return buildAttr(valHeight, 'hgt', insertStyles);
};

export default buildHeight;
