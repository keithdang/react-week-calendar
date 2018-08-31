import React from "react";
import moment from "moment";
import { dayOfTheWeekShort } from "../../../src/Utils";
import { Grid, Row, Col } from "react-bootstrap";
export function setCourses(arr, course, index) {
  for (var i = 0; i < course.days.length; i++) {
    let courseInfo = {
      uid: index,
      start: moment({
        h: course.startHour,
        m: course.startMinute
      }).add(course.days[i] - 1, "d"),
      end: moment({
        h: course.endHour,
        m: course.endMinute
      }).add(course.days[i] - 1, "d"),
      value: course.code,
      color: course.color
    };
    arr.push(courseInfo);
    index++;
  }
}
function displayDays(daysArray) {
  return _.map(daysArray, day => {
    return <p style={{ paddingRight: "5px" }}>{dayOfTheWeekShort(day - 1)}</p>;
  });
}
function convertTo12(hour, minute) {
  var notation = "am";
  var displayHour = hour;
  var displayMinute = minute;
  if (hour > 12) {
    displayHour = hour - 12;
    notation = "pm";
  } else if (hour == 0) {
    displayHour = 12;
  }
  if (minute < 10) {
    displayMinute = "0" + minute;
  }
  return `${displayHour}:${displayMinute} ${notation}`;
}
export function displayTime(course) {
  return (
    <p>
      {convertTo12(course.startHour, course.startMinute)}-
      {convertTo12(course.endHour, course.endMinute)}
    </p>
  );
}

export function displayCourseOptions(course) {
  var numCells = 3;
  if (course.length === 3) {
    numCells = 2;
  }
  var courseOptions = _.map(course, option => {
    return (
      <Col xs={12} md={numCells}>
        <div style={{ display: "flex" }}>{displayDays(option.days)}</div>
        <div>{displayTime(option)}</div>
        <div>{option.prof}</div>
      </Col>
    );
  });
  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <h5>Available Times</h5>
          {courseOptions}
        </Row>
      </Grid>
    </div>
  );
}
