import { ILayouter } from './../layouter';
import { processors } from '../config/processors';
import getConfig from '../config/main';

const initAutoProcessor = (layouter: ILayouter) => {
  return new Promise((resolve) => {
    const config = getConfig();
    const props = Object.keys(processors);
    const attrs = props.map((prop) => `[${prop}]`).join(', ');
    const nodes = config.context.document.querySelectorAll(attrs);

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

export default initAutoProcessor;
