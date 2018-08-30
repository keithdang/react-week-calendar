/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";

import "../../../src/style.less";
import StandardCalendar from "./StandardCalendar";
import CustomCalendar from "./CustomCalendar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: "default"
    };
  }

  changeCalendar = calendar => {
    this.setState({ calendar });
  };

  render() {
    const calendar = this.state.calendar;

    return (
      <div>
        <StandardCalendar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
