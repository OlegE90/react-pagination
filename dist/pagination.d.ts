/// <reference types="react" />
import 'assets/styles/main.less';
import * as React from 'react';
/**
 * Direction.
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
 * @prop {Function} [renderRowOneStep] Render row for one step (Right && Left).
 * @prop {Function} [renderRowLast] Render row to last page (Right && Left).
 */
export interface IProps {
    activePage: number;
    className: string;
    totalPageRange: number;
    pageRangeDisplayed: number;
    onChange: (page: number) => void;
    renderRowOneStep?: (row: EDirection) => JSX.Element;
    renderRowLast?: (row: EDirection) => JSX.Element;
}
export default class  extends React.Component<IProps, {}> {
    isAvailableNumber: (number: number) => boolean;
    handlerChangePage: (number: number) => (e: any) => void;
    renderNumbers(): JSX.Element;
    renderRowBackOneStep: () => JSX.Element;
    renderRowNextOneStep: () => JSX.Element;
    renderRowToFirst: () => JSX.Element;
    renderRowToLast: () => JSX.Element;
    render(): JSX.Element;
}