import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Pagination} from './pagination'

export class PaginationTest extends React.Component<{}, {}> {

    state = {
        activePage: 1,
        itemsCountPerPage: 5,
        totalItemsCount: 20,
    }

    handleOnChange = (number: number) => {
        this.setState({
            activePage: number
        })
    }

    render () {
        const {activePage, itemsCountPerPage, totalItemsCount} = this.state;

        return (
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                onChange={this.handleOnChange}
            />
        );
    }
}

ReactDOM.render(
    <PaginationTest />,
    document.getElementById('root')
);
