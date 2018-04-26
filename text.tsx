import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Pagination from './pagination'
import {EDirection} from "./src/PaginationMain";

export class PaginationApp extends React.Component<{}, {}> {

    state = {
        activePage: 1,
        pageRangeDisplayed: 5,
        totalPageRange: 20,
    }

    handleOnChange = (number: number) => {
        this.setState({
            activePage: number
        })
    }

    render () {
        const {activePage, pageRangeDisplayed, totalPageRange} = this.state;

        return (
            <Pagination
                activePage={activePage}
                totalPageRange={totalPageRange}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={this.handleOnChange}
            >
                {(result) => (
                    <ul>
                        {result.rowRenderRight((direction: EDirection, isLastArrow: boolean, isDisable: boolean) => <li><span>{'<<'}</span></li>)}
                        {result.number.map((item) => <li className={item.active}>{item.number}</li>)}
                        {result.rowRenderLeft((direction: EDirection, isLastArrow: boolean, isDisable: boolean) => <li><span>{'<<'}</span></li>)}
                    </ul>
                )}
            </Pagination>
        );
    }
}

ReactDOM.render(
    <PaginationApp />,
    document.getElementById('root')
);
