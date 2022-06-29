import { ILayouter } from './../layouter';
import { processors } from '../config/processors';

const nodesNotAccepted = [
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'discard',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'hatch',
  'hatchpath',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'style',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tspan',
  'use',
  'view',
];

const searchAndProcess = (
  layouter: ILayouter,
  context: Document | HTMLElement | Element
) => {
  return new Promise((resolve) => {
    const props = Object.keys(processors);
    const attrs = props.map((prop) => `[${prop}]`).join(', ');
    const nodes = context.querySelectorAll(attrs);
    if (!nodes.length) {
      resolve(layouter);
      return;
    }

    const setNodes = new Set();
    Array.prototype.filter
      .call(
        nodes,
        (itemNode) =>
          !nodesNotAccepted.includes(itemNode.nodeName.toLowerCase())
      )
      .forEach((item) => setNodes.add(item));
    const promises: Promise<void | Error>[] = [];
    setNodes.forEach((node) => {
      promises.push(layouter.set(node as Element | HTMLElement));
    });
    Promise.all(promises).then(resolve);
  });
};

export default searchAndProcess;
