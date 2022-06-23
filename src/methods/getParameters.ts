import { processors, TDirectiveName } from '../config/processors';

const getParameters = (Node: HTMLElement | Element): Partial<Record<TDirectiveName, string>> => {
  const params: Partial<Record<TDirectiveName, string>> = {};
  const attrs = Node.attributes;
  const paramNames = Object.keys(processors);
  Array.prototype.forEach.call(attrs, attr => {
    if (paramNames.includes(attr.name)) {
      if (attr.value !== '')
        params[attr.name as TDirectiveName] = attr.value
          .trim()
          .split(' ')
          .filter((item: string) => item)
          .join(' ');
    }
  });
  return params;
};

export default getParameters;
