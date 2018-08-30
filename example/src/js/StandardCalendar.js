import React from "react";
import moment from "moment";
import WeekCalendar from "react-week-calendar";
import { schedule } from "./schedule";
import course from "./courses";
import { Modal, Table, Grid, Row, Button, Col } from "react-bootstrap";
export default class StandardCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.setCourseList = this.setCourseList.bind(this);
    this.setCourses = this.setCourses.bind(this);
    this.nextSchedule = this.nextSchedule.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      lastUid: 4,
      selectedIntervals: [],
      scheduleIndex: 0,
      showSchedule: false,
      courseArray: [],
      scheduleCombos: [],
      show: false,
      courseDisplay: null
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow(course) {
    this.setState({ show: true, courseDisplay: course });
  }
  setCourses(arr, course, index) {
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
        value: course.code
      };
      arr.push(courseInfo);
      index++;
    }
  }
  setCourseList(tmpArr, courseList, index) {
    for (var i = 0; i < courseList.length; i++) {
      this.setCourses(tmpArr, courseList[i], index);
    }
  }
  renderCourseModal() {
    const { courseDisplay, show } = this.state;
    return (
      <div>
        {courseDisplay && (
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{courseDisplay[0].name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{courseDisplay[0].code}</h4>
              <hr />
              <div>Hello</div>
              <h5>Hello</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.addCourse(courseDisplay)}>
                Add Course
              </Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
  handleEventRemove = event => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex(
      interval => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({ selectedIntervals });
    }
  };

  handleEventUpdate = event => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex(
      interval => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({ selectedIntervals });
    }
  };

  handleSelect = newIntervals => {
    const { lastUid, selectedIntervals } = this.state;
    const intervals = newIntervals.map((interval, index) => {
      return {
        ...interval,
        uid: lastUid + index
      };
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    });
  };
  nextSchedule() {
    this.forceUpdate();
    const { scheduleIndex, courseArray, scheduleCombos } = this.state;
    var combinationList = scheduleCombos[scheduleIndex];
    var tmpArr = [];
    var index = 0;
    var newIndex = scheduleIndex + 1;
    if (scheduleIndex === scheduleCombos.length - 1) {
      newIndex = 0;
    }
    this.setCourseList(tmpArr, combinationList, index);
    this.setState({ selectedIntervals: tmpArr, scheduleIndex: newIndex });
  }
  selectCourses() {
    const {
      scheduleIndex,
      courseArray,
      showSchedule,
      scheduleCombos
    } = this.state;
    if (courseArray && courseArray.length > 0) {
      var tmpSchedule = schedule(courseArray);
      var combinationList = tmpSchedule[scheduleIndex];
      var tmpArr = [];
      var index = 0;
      this.setCourseList(tmpArr, combinationList, index);
      this.setState({
        selectedIntervals: tmpArr,
        scheduleIndex: scheduleIndex + 1,
        scheduleCombos: tmpSchedule
      });
    }
    this.setState({ showSchedule: true });
  }
  inCourseArray(course) {
    var inArray = false;
    const { courseArray } = this.state;
    if (courseArray.length > 0) {
      for (var i = 0; i < courseArray.length; i++) {
        if (courseArray[i] === course) {
          inArray = true;
        }
      }
    }
    return inArray;
  }
  addCourse(course) {
    const { courseArray } = this.state;
    if (!this.inCourseArray(course)) {
      let tmpArray = courseArray;
      tmpArray.push(course);
      this.setState({ courseArray: tmpArray });
      this.forceUpdate();
    }
    this.setState({ show: false });
  }
  showCoursesAvailable() {
    console.log("show all:", course.allCourses);
    return _.map(course.allCourses, item => {
      return (
        <li>
          <a role="button" onClick={() => this.handleShow(item)}>
            {item[0].code}
          </a>
        </li>
      );
    });
  }
  goBack() {
    this.setState({ showSchedule: false });
  }
  removeCourse(course) {
    const { courseArray } = this.state;
    for (var i = 0; i < courseArray.length; i++) {
      if (courseArray[i] === course) {
        console.log("match");
        let tmpArr = courseArray;
        tmpArr.splice(i, 1);
        this.setState({ courseArray: tmpArr });
      }
    }
  }
  showSelectedCourses() {
    const { courseArray } = this.state;
    return _.map(courseArray, item => {
      return (
        <li>
          <Button>
            {item[0].code}
            <div
              type="button"
              class="close"
              aria-label="Close"
              onClick={() => this.removeCourse(item)}
            >
              <span aria-hidden="true">&times;</span>
            </div>
          </Button>
        </li>
      );
    });
  }
  render() {
    const { showSchedule, courseArray } = this.state;
    return (
      <div>
        {!showSchedule && (
          <Grid>
            <Row className="show-grid">
              <a
                role="button"
                onClick={() => this.selectCourses()}
                className="hello"
              >
                Go to schedule
              </a>
            </Row>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <div>
                  <h5>Courses Available</h5>
                  <ul>{this.showCoursesAvailable()}</ul>
                  <div>{this.renderCourseModal()}</div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div>
                  <h5>Courses Selected</h5>
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    {this.showSelectedCourses()}
                  </ul>
                </div>
              </Col>
            </Row>
          </Grid>
        )}

        {showSchedule && (
          <div>
            <a role="button" onClick={() => this.goBack()}>
              Back
            </a>
            <a role="button" onClick={() => this.nextSchedule()}>
              Next Schedule
            </a>

            <WeekCalendar
              startTime={moment({ h: 9, m: 0 })}
              endTime={moment({ h: 17, m: 45 })}
              numberOfDays={5}
              selectedIntervals={this.state.selectedIntervals}
              onIntervalSelect={this.handleSelect}
              onIntervalUpdate={this.handleEventUpdate}
              onIntervalRemove={this.handleEventRemove}
            />
          </div>
        )}
      </div>
    );
  }
}
