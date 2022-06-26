import { ILayouter } from './../layouter';
import { processors } from '../config/processors';

const searchAndProcess = (layouter: ILayouter, context: Document | HTMLElement | Element) => {
  return new Promise((resolve) => {
    const props = Object.keys(processors);
    const attrs = props.map((prop) => `[${prop}]`).join(', ');
    const nodes = context.querySelectorAll(attrs);
    if (!nodes.length) {
      resolve(layouter);
      return;
    }

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

export default searchAndProcess;
