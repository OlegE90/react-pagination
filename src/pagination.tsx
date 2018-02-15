import 'assets/styles/main.less';

import * as React from 'react';

/**
 * @prop {number} activePage Current page.
 * @prop {number} itemsCountPerPage Elements on page.
 * @prop {number} totalItemsCount Total pages.
 * @prop {Function} onChange The handler of changing position.
 */
interface IProps {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    onChange: (page: number) => void;
}

export class Pagination extends React.Component<IProps, {}> {

    isAvailableNumber = (number: number): boolean => number > 0 && number <= this.props.totalItemsCount;

    handlerChangePage = (number: number) => (e: any) => {
        this.props.onChange(number);
    };

    renderNumbers (): JSX.Element {
        const {activePage, itemsCountPerPage, totalItemsCount} = this.props;
        const part = Math.min(totalItemsCount, itemsCountPerPage);

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
                    <li onClick={this.handlerChangePage(value)}
                        className={`page-item ${value === activePage ? 'active' : ''}`}>
                        <a className="page-link">{value}</a>
                    </li>
                )
            })}
        </React.Fragment>

    }

    renderRowBackOneStep = () => {
        const backStep = this.props.activePage - 1;

        return this.isAvailableNumber(backStep) ? (
            <li
                onClick={this.handlerChangePage(backStep)}
                className="row-step-back"
            >
                {'<'}
            </li>
        ) : null;
    };

    renderRowNextOneStep = () => {
        const nextStep = this.props.activePage + 1;

        return this.isAvailableNumber(nextStep) ? (
            <li
                onClick={this.handlerChangePage(nextStep)}
                className="row-step-next"
            >
                {'>'}
            </li>
        ) : null;
    };

    renderRowToFirst = () => {
        const isVisible = this.isAvailableNumber(this.props.activePage - 1);

        return isVisible ? (
            <li
                onClick={this.handlerChangePage(1)}
                className="row-step-next"
            >
                {'<<'}
            </li>
        ) : null;
    };

    renderRowToLast = () => {
        const {activePage, totalItemsCount} = this.props;
        const isVisible = this.isAvailableNumber(activePage + 1);

        return isVisible ? (
            <li
                onClick={this.handlerChangePage(totalItemsCount)}
                className="row-step-next"
            >
                {'>>'}
            </li>
        ) : null;
    };

    render () {
        const {activePage} = this.props;

        return (
            <ul className="pagination">
                {this.renderRowToFirst()}
                {this.renderRowBackOneStep()}
                {this.renderNumbers()}
                {this.renderRowNextOneStep()}
                {this.renderRowToLast()}
            </ul>
        );
    }
}
