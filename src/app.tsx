import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Pagination from './Pagination'

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

    render() {
        const { activePage, pageRangeDisplayed, totalPageRange } = this.state;

        return (
            <Pagination
                activePage={activePage}
                totalPageRange={totalPageRange}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={this.handleOnChange}
            />
        );
    }
}

ReactDOM.render(
    <PaginationApp />,
    document.getElementById('root')
);
