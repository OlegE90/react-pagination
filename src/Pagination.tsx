import 'assets/styles/main.less';

import * as React from 'react';

import Arrow from './Arrow';
import { getNumber } from './utils';

/**
 * Arrow direction.
 */
export enum EDirection {
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
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
    children?: Function;
}

export default class extends React.Component<IProps, {}> {

    isAvailableNumber = (number: number): boolean => number > 0 && number <= this.props.totalPageRange;

    handlerChangePage = (number: number) => (e: any) => {
        this.props.onChange(number);
    };

    renderArrowBackOneStep = (): JSX.Element => {
        const {activePage, hideArrows, renderArrowOneStep} = this.props;
        const backStep = activePage - 1;
        const isAvailable = this.isAvailableNumber(backStep);

        return hideArrows && !isAvailable ? null : (
            <Arrow
                onClick={this.handlerChangePage(backStep)}
                className="arrow_step-back"
                disable={!isAvailable}
            >
                {renderArrowOneStep && renderArrowOneStep(EDirection.LEFT) || <span>{'<'}</span>}
            </Arrow>
        );
    };

    renderArrowToFirst = (): JSX.Element => {
        const {activePage, hideArrows, renderArrowLast} = this.props;
        const isAvailable = this.isAvailableNumber(activePage - 1);

        return hideArrows && !isAvailable ? null : (
            <Arrow
                onClick={this.handlerChangePage(1)}
                disable={!isAvailable}
                className="arrow_first"
            >
                {renderArrowLast && renderArrowLast(EDirection.LEFT) || <span>{'<<'}</span>}
            </Arrow>
        );
    };

    renderArrowNextOneStep = (): JSX.Element => {
        const {activePage, hideArrows, renderArrowOneStep} = this.props;
        const nextStep = activePage + 1;
        const isAvailable = this.isAvailableNumber(nextStep);

        return hideArrows && !isAvailable ? null : (
            <Arrow
                onClick={this.handlerChangePage(nextStep)}
                className="arrow_step-next"
                disable={!isAvailable}
            >
                {renderArrowOneStep && renderArrowOneStep(EDirection.RIGHT) || <span>{'>'}</span>}
            </Arrow>
        );
    };

    renderArrowToLast = (): JSX.Element => {
        const {activePage, hideArrows, totalPageRange, renderArrowLast} = this.props;
        const isAvailable = this.isAvailableNumber(activePage + 1);

        return hideArrows && !isAvailable ? null : (
            <Arrow
                onClick={this.handlerChangePage(totalPageRange)}
                disable={!isAvailable}
                className="arrow_last"
            >
                {renderArrowLast && renderArrowLast(EDirection.RIGHT) || <span>{'>>'}</span>}
            </Arrow>
        );
    };

    renderCustomVersion = () => {
        const { activePage, pageRangeDisplayed, totalPageRange, children } = this.props;

        if (children === "function") {
            const arrow = ['oneStep', 'last'];

            return children({
                number: getNumber(activePage, pageRangeDisplayed, totalPageRange),
                rowRenderLeft: (callback) => {
                    [true, false].map((isLast) => callback(EDirection.LEFT, isLast, this.isAvailableNumber(activePage - 1)));
                },
                rowRenderRight: (callback) => {
                    [true, false].map((isLast) => callback(EDirection.RIGHT, isLast, this.isAvailableNumber(activePage + 1)));
                }
            });
        }
    };

    renderDefault = () => {
        const { activePage, pageRangeDisplayed, totalPageRange } = this.props;

        return (
            <ul className={this.props.className || 'pagination'}>
                {this.renderArrowToFirst()}
                {this.renderArrowBackOneStep()}
                {getNumber(activePage, pageRangeDisplayed, totalPageRange).map((value) => (
                    <li key={value} onClick={this.handlerChangePage(value)}
                        className={`page-item ${value === activePage ? 'active' : ''}`}>
                        <a className="page-link">{value}</a>
                    </li>
                ))}
                {this.renderArrowNextOneStep()}
                {this.renderArrowToLast()}
            </ul>
        );
    };

    render() {
        return typeof this.props.children === "function" ? this.renderCustomVersion() : this.renderDefault()
    }
}
