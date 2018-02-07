import 'assets/styles/main.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';


/**
 * Интерфейс фильтра списка банкоматов.
 *
 * @prop {number} activePage Текущая страница.
 * @prop {number} itemsCountPerPage Кол-во элементов на странице.
 * @prop {number} totalItemsCount Общее кол-во страниц.
 * @prop {Function} onChange Обработчик перехода на другую страницу.
 */
interface IProps {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    onChange: (page: number) => void;
}

export class Pagination extends React.Component<IProps, {}> {

    isAvailableNumber = (number: number): boolean => number > 0 && number < this.props.totalItemsCount;

    getLeftNumber (count: number): number[] {
        const {activePage} = this.props;
        const numbersLeft = count;
        let numbers = [];

        for(let i = numbersLeft; i > 0; i--) {
            let number = activePage - i;
            this.isAvailableNumber(number) && numbers.push(number);
        }

        return numbers
    }

    getRightNumber (count: number): number[] {
        const {activePage} = this.props;
      //  const numbersRight = count + this.freeSpace;
        let numbers = [];

        for(let i = 1; i <= count; i++) {
            let number = activePage + i;
            this.isAvailableNumber(number) && numbers.push(number);
        }
        return numbers
    }

    renderNumbers (): JSX.Element {
        const {activePage, itemsCountPerPage} = this.props;
        const itemsInPart = (itemsCountPerPage-1)/2;

        const numbers: number[] = [
            ...this.getLeftNumber(Math.ceil(itemsInPart)),
            activePage,
            ...this.getRightNumber(Math.floor(itemsInPart)),
        ];

        return <React.Fragment>
            {numbers.map((value) => {
                return (
                    <li className={`page-item ${value === activePage ? 'active' : ''}`}>
                        <a className="page-link">{value}</a>
                    </li>
                )
            })}
        </React.Fragment>

    }

    render () {
        const {activePage} = this.props;

        return (
            <ul className="pagination">
                {this.renderNumbers()}
            </ul>
        );
    }
}

ReactDOM.render(
    <Pagination
        activePage={50}
        itemsCountPerPage={7}
        totalItemsCount={50}
        onChange={() => {}}
    />,
    document.getElementById('root')
);
