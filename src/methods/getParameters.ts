import { processors } from "../config/processors";

export interface IParams {
  [attrName: string]: string[];
}

const getParameters = (Node: HTMLElement): IParams => {
  const params: IParams = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(processors);
  Array.prototype.forEach.call(attrs, attr => {
    if ( paramNames.includes( attr.name) ) {
      if (attr.value !== '')
        params[attr.name] = attr.value
          .trim()
          .split(' ')
          .filter((item: string) => {
            return item;
          });
    }
  });
  return params;
};

export default getParameters;
