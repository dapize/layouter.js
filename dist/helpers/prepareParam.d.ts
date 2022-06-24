export interface IPrepareParamObj {
    widthBp: boolean;
    numbers: string;
    breakPoints: string;
    important: boolean;
}
declare const prepareParam: (param: string) => IPrepareParamObj;
export default prepareParam;
