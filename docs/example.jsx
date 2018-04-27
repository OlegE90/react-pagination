import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Pagination from './pagination'
import {EDirection} from "./src/PaginationMain";

export class PaginationApp extends React.Component {
  state = {
    activePage: 21,
    pageRangeDisplayed: 5,
    totalPageRange: 20
  };

  handleOnChange = (number) => {
    this.setState({
      activePage: number
    });
  };

  renderSimpleVersion = () => {
    const { activePage, pageRangeDisplayed, totalPageRange } = this.state;

    return (
      <Pagination
        activePage={activePage}
        totalPageRange={totalPageRange}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={this.handleOnChange}
      />
    );
  };

  renderCustomVerstion = () => {
    const { activePage, pageRangeDisplayed, totalPageRange } = this.state;
    const liStyle = {
      display: "inline",
      border: "1px solid grey",
      cursor: "pointer",
      padding: "5px"
    };

    return (
      <Pagination
        activePage={activePage}
        totalPageRange={totalPageRange}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={this.handleOnChange}
      >
        {result => (
          <ul style={{ listStyle: "none" }}>
            {result.rowRenderLeft((isLastArrow, isDisable, handleChange) => (
              <li style={liStyle} onClick={handleChange}>
                <span>{isLastArrow ? "<<" : "<"}</span>
              </li>
            ))}
            {result.numbers.map(({ isActive, number, handleChange }) => (
              <li
                style={{
                  ...liStyle,
                  ...(isActive ? { background: "blue", color: "white" } : {})
                }}
                onClick={handleChange}
              >
                {number}
              </li>
            ))}
            {result.rowRenderRight((isLastArrow, isDisable, handleChange) => (
              <li style={liStyle} onClick={handleChange}>
                <span>{isLastArrow ? ">>" : ">"}</span>
              </li>
            ))}
          </ul>
        )}
      </Pagination>
    );
  };

  render() {
    return (
      <div>
        {this.renderSimpleVersion()}
        {this.renderCustomVerstion()}
      </div>
    );
  }
}

ReactDOM.render(<PaginationApp />, document.getElementById("root"));
