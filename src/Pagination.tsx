import 'assets/styles/main.less';

import * as React from 'react';

import Row from './Row';

/**
 * Row direction.
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
 * @prop {Function} [renderRowOneStep] Render custom row for one step (Right && Left).
 * @prop {Function} [renderRowLast] Render custom row to last page (Right && Left).
 * @prop {boolean} [hideRow] Hide not available row.
 */
export interface IProps {
    activePage: number;
    className?: string;
    totalPageRange: number;
    pageRangeDisplayed: number;
    onChange: (page: number) => void;
    renderRowOneStep?: (row: EDirection) => JSX.Element;
    renderRowLast?: (row: EDirection) => JSX.Element;
    hideRow?: boolean;
}

export default class extends React.Component<IProps, {}> {

    isAvailableNumber = (number: number): boolean => number > 0 && number <= this.props.totalPageRange;

    handlerChangePage = (number: number) => (e: any) => {
        this.props.onChange(number);
    };

    renderNumbers (): JSX.Element {
        const {activePage, pageRangeDisplayed, totalPageRange} = this.props;
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

        const numbers: number[] = [
            ...leftNumbers.reverse(),
            activePage,
            ...rightNumbers,
        ];

        return <React.Fragment>
            {numbers.map((value) => {
                return (
                    <li key={value} onClick={this.handlerChangePage(value)}
                        className={`page-item ${value === activePage ? 'active' : ''}`}>
                        <a className="page-link">{value}</a>
                    </li>
                )
            })}
        </React.Fragment>
    }

    renderRowBackOneStep = (): JSX.Element => {
        const {activePage, hideRow, renderRowOneStep} = this.props;
        const backStep = activePage - 1;
        const isAvailable = this.isAvailableNumber(backStep);

        return hideRow && !isAvailable ? null : (
            <Row
                onClick={this.handlerChangePage(backStep)}
                className="row_step-back"
                disable={!isAvailable}
            >
                {renderRowOneStep && renderRowOneStep(EDirection.LEFT) || <span>{'<'}</span>}
            </Row>
        );
    };

    renderRowNextOneStep = (): JSX.Element => {
        const {activePage, hideRow, renderRowOneStep} = this.props;
        const nextStep = activePage + 1;
        const isAvailable = this.isAvailableNumber(nextStep);

        return hideRow && !isAvailable ? null : (
            <Row
                onClick={this.handlerChangePage(nextStep)}
                className="row_step-next"
                disable={!isAvailable}
            >
                {renderRowOneStep && renderRowOneStep(EDirection.RIGHT) || <span>{'>'}</span>}
            </Row>
        );
    };

    renderRowToFirst = (): JSX.Element => {
        const {activePage, hideRow, renderRowLast} = this.props;
        const isAvailable = this.isAvailableNumber(activePage - 1);

        return hideRow && !isAvailable ? null : (
            <Row
                onClick={this.handlerChangePage(1)}
                disable={!isAvailable}
                className="row_first"
            >
                {renderRowLast && renderRowLast(EDirection.LEFT) || <span>{'<<'}</span>}
            </Row>
        );
    };

    renderRowToLast = (): JSX.Element => {
        const {activePage, hideRow, totalPageRange, renderRowLast} = this.props;
        const isAvailable = this.isAvailableNumber(activePage + 1);

        return hideRow && !isAvailable ? null : (
            <Row
                onClick={this.handlerChangePage(totalPageRange)}
                disable={!isAvailable}
                className="row_last"
            >
                {renderRowLast && renderRowLast(EDirection.RIGHT) || <span>{'>>'}</span>}
            </Row>
        );
    };

    render () {
        return (
            <ul className={this.props.className || 'pagination'}>
                {this.renderRowToFirst()}
                {this.renderRowBackOneStep()}
                {this.renderNumbers()}
                {this.renderRowNextOneStep()}
                {this.renderRowToLast()}
            </ul>
        );
    }
}
