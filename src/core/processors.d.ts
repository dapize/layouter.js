export interface IProcessors {
  [proName: string]: {
    set: string;
    build: string;
    ruleCss: string;
  };
}
