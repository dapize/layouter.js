import { ILayouter } from './../main';
import { processors } from '../config/processors';

const initAutoProcessor = (layouter: ILayouter) => {
  return new Promise((resolve) => {
    const props = Object.keys(processors);
    const attrs = props.map((prop) => `[${prop}]`).join(', ');
    const nodes = document.querySelectorAll(attrs);
    const setNodes = new Set();
    Array.prototype.forEach.call(nodes, (itemNode) => {
      setNodes.add(itemNode);
    });
    const promises: Promise<void | Error>[] = [];
    setNodes.forEach((node) => {
      promises.push(layouter.set(node as Element | HTMLElement));
    });
    Promise.all(promises).then(resolve);
  });
};

export default initAutoProcessor;
