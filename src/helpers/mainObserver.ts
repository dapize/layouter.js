import { ILayouter } from './../main';
import { processors } from '../config/processors';

const mainObserver = (layouter: ILayouter) => {
  const props = Object.keys(processors);
  const obsBody = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        if (!mutation.addedNodes.length) {
          continue;
        }
        mutation.addedNodes.forEach(node => {
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
  obsBody.observe(document.body, observerOptions);
};

export default mainObserver;
