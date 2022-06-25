import getConfig from '../config/main';
import addClasses from '../utils/addClasses';
import removeAttr from '../utils/removeAttr';

export interface IEventReady {
  node: HTMLElement | Element;
  directive: string | string[];
  classes: string;
  resolve: (value: void | Error | PromiseLike<void | Error>) => void;
}

const eventReady = ({ node, directive, classes, resolve }: IEventReady) => {
  const config = getConfig();
  removeAttr(node, directive)
    .then(() => addClasses(node, classes))
    .then(() => {
      resolve();
      const event = new config.context.CustomEvent('layout:ready');
      node.dispatchEvent(event);
    });
};

export default eventReady;
