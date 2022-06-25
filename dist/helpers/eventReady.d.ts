export interface IEventReady {
    node: HTMLElement | Element;
    directive: string | string[];
    classes: string;
    resolve: (value: void | Error | PromiseLike<void | Error>) => void;
}
declare const eventReady: ({ node, directive, classes, resolve }: IEventReady) => void;
export default eventReady;
