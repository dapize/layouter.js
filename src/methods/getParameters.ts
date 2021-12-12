import processors from '../processors';

export interface IParams {
  [attrName: string]: string;
}

const getParameters = (Node: HTMLElement): IParams => {
  const params: IParams = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(processors);
  Array.prototype.forEach.call(attrs, function(attr) {
    if (paramNames.indexOf(attr.name) !== -1) {
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
