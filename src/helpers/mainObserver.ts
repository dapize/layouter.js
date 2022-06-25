import { ILayouter } from './../layouter';
import { processors } from '../config/processors';
import getConfig from '../config/main';

const mainObserver = (layouter: ILayouter) => {
  const config = getConfig();
  const props = Object.keys(processors);
  const obsBody = new layouter.context.MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        if (!mutation.addedNodes.length) {
          continue;
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const props = layouter.getParameters(node);
            if (Object.keys(props).length) {
              layouter.set(node, props);
            }
          }
        });
      } else if (mutation.type === 'attributes') {
        const node = mutation.target;
        if (node instanceof HTMLElement) {
          const props = layouter.getParameters(node);
          if (Object.keys(props).length) {
            layouter.set(node, props);
          }
        }
      }
    }
  });
  const observerOptions = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: props,
    characterData: false,
  };
  obsBody.observe(config.context.document.body, observerOptions);
};

export default mainObserver;
