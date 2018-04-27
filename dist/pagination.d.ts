/// <reference types="react" />
import 'assets/styles/main.less';
import * as React from 'react';
/**
 * Arrow direction.
 */
export declare enum EDirection {
    RIGHT = "RIGHT",
    LEFT = "LEFT",
}
/**
 * @prop {number} activePage Current page.
 * @prop {string} [className].
 * @prop {number} totalPageRange Total pages.
 * @prop {number} pageRangeDisplayed Count of displaying pages.
 * @prop {Function} onChange The handler of changing position.
 * @prop {Function} [renderArrowOneStep] Render custom arrow for one step (Right && Left).
 * @prop {Function} [renderArrowLast] Render custom arrow to last page (Right && Left).
 * @prop {boolean} [hideArrows] Hide not available arrows.
 */
export interface IProps {
    activePage: number;
    className?: string;
    totalPageRange: number;
    pageRangeDisplayed: number;
    onChange: (page: number) => void;
    renderArrowOneStep?: (direction: EDirection) => JSX.Element;
    renderArrowLast?: (direction: EDirection) => JSX.Element;
    hideArrows?: boolean;
    children?: (params: any) => JSX.Element;
}
export default class  extends React.Component<IProps, {}> {
    isAvailableNumber: (number: number) => boolean;
    getNumber: () => number[];
    handlerChangePage: (number: number) => (e: any) => void;
    renderArrowBackOneStep: () => JSX.Element;
    renderArrowToFirst: () => JSX.Element;
    renderArrowNextOneStep: () => JSX.Element;
    renderArrowToLast: () => JSX.Element;
    renderCustomVersion: () => JSX.Element;
    renderDefault: () => JSX.Element;
    render(): JSX.Element;
}
