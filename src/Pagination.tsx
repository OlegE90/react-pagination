import 'assets/styles/main.less';

import * as React from 'react';

import Arrow from './Arrow';
import { ICustomUIChildrenResult } from './models';

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
    children?: (params: ICustomUIChildrenResult) => JSX.Element;
}

export default class extends React.Component<IProps, {}> {

    isAvailableNumber = (number: number): boolean => number > 0 && number <= this.props.totalPageRange;

    getNumber = (): number[] => {
        const {activePage, totalPageRange, pageRangeDisplayed} = this.props;
        const part = Math.min(totalPageRange, pageRangeDisplayed);

        if (part < 2) {
            return;
        }

        let countNumbersLeft = Math.ceil((part - 1) / 2);
        let countNumbersRight = Math.floor((part - 1) / 2);
        let leftNumbers = [];
        let rightNumbers = [];
        let i = 0;
        let k = 0;

        while (countNumbersLeft > 0 || countNumbersRight > 0) {
            i++;
            k++;

            if (countNumbersLeft) {
                let number = activePage - i;
                if (this.isAvailableNumber(number)) {
                    leftNumbers.push(number);
                    --countNumbersLeft;
                } else {
                    countNumbersRight += countNumbersLeft;
                    countNumbersLeft = 0;
                }
            }

            if (countNumbersRight) {
                let number = activePage + k;
                if (this.isAvailableNumber(number)) {
                    rightNumbers.push(number);
                    --countNumbersRight;
                } else {
                    countNumbersLeft += countNumbersRight;
                    countNumbersRight = 0;
                }
            }
        }

        return [
            ...leftNumbers.reverse(),
            activePage,
            ...rightNumbers,
        ];
    };

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
        const {activePage, children, totalPageRange} = this.props;

        return children({
            renderArrowsLeft: (callback) => [true, false].map((isLast) =>
                callback({
                    isLastArrow: isLast,
                    isAvailable: this.isAvailableNumber(activePage - 1),
                    handleChange: this.handlerChangePage(isLast ? 1 : activePage - 1)
                })
            ),
            numbers: this.getNumber().map((number) => ({
                number,
                isActive: activePage === number,
                handleChange: this.handlerChangePage(number)
            })),
            renderArrowsRight: (callback) => [false, true].map((isLast) =>
                callback({
                    isLastArrow: isLast,
                    isAvailable: this.isAvailableNumber(activePage + 1),
                    handleChange: this.handlerChangePage(isLast ? totalPageRange : activePage + 1)
                }))
        });
    };

    renderDefault = () => {
        const { activePage } = this.props;

        return (
            <ul className={this.props.className || 'pagination'}>
                {this.renderArrowToFirst()}
                {this.renderArrowBackOneStep()}
                {this.getNumber().map((value) => (
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
