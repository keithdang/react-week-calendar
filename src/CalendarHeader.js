import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { dayOfTheWeek } from "./Utils";
const propTypes = {
  firstDay: PropTypes.object.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  dayFormat: PropTypes.string.isRequired,
  columnDimensions: PropTypes.array.isRequired
};

export class CalendarHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    // for columnDimensions return new object
    return (
      nextProps.numberOfDays !== this.props.numberOfDays ||
      !nextProps.firstDay.isSame(this.props.firstDay, "day") ||
      nextProps.columnDimensions !== this.props.columnDimensions
    );
  }
  // dayOfTheWeek(day) {
  //   switch (day) {
  //     case 0:
  //       return "Monday";
  //     case 1:
  //       return "Tuesday";
  //     case 2:
  //       return "Wednesday";
  //     case 3:
  //       return "Thursday";
  //     case 4:
  //       return "Friday";
  //   }
  // }
  render() {
    const { firstDay, numberOfDays, dayFormat, columnDimensions } = this.props;

    const HeaderCell = this.props.headerCellComponent;

    if (columnDimensions.length === 0) {
      return null;
    }

    const weekdayColumns = [];
    let totalWidth = 0;

    for (let i = 0; i < numberOfDays; i += 1) {
      const date = moment(firstDay).add(i, "d");
      const { width } = columnDimensions[i];
      console.log(width);
      totalWidth += width;
      const newCell = (
        <div key={i} className="weekCalendar__headerColumn" style={{ width }}>
          <p>{dayOfTheWeek(i)}</p>
        </div>
      );
      weekdayColumns.push(newCell);
    }

    return (
      <div
        style={{ width: totalWidth }}
        className="weekCalendar__headerWrapper"
      >
        {weekdayColumns}
      </div>
    );
  }
}

CalendarHeader.propTypes = propTypes;

export default CalendarHeader;
