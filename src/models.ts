
/**
 * If Pagination component has a function as a child result this function will has a next interface...
 */
export interface ICustomUIChildrenResult {
    renderArrowsLeft?: (callback: (result: ICustomUIResultRowFunction) => JSX.Element) => JSX.Element[],
    numbers: ICustomUIResultNumber[],
    renderArrowsRight?: (callback: (result: ICustomUIResultRowFunction) => JSX.Element) => JSX.Element[],
}

export interface ICustomUIResultNumber {
    number: number,
    isActive: boolean,
    handleChange: (number: number) => void,
}

export interface ICustomUIResultRowFunction {
    isLastArrow: boolean,
    isAvailable: boolean,
    handleChange: (number: number) => void,
}
