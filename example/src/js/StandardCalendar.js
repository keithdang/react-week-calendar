import React from "react";
import moment from "moment";
import WeekCalendar from "react-week-calendar";
import { schedule } from "./schedule";
import course from "./courses";
import { dayOfTheWeekShort } from "../../../src/Utils";
import { Modal, Table, Grid, Row, Button, Col } from "react-bootstrap";
import { setCourses, displayTime, displayCourseOptions } from "./courseUtils";
export default class StandardCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.setCourseList = this.setCourseList.bind(this);
    this.nextSchedule = this.nextSchedule.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.overlapShow = this.overlapShow.bind(this);
    this.overlapClose = this.overlapClose.bind(this);
    this.state = {
      lastUid: 4,
      selectedIntervals: [],
      scheduleIndex: 0,
      showSchedule: false,
      courseArray: [],
      scheduleCombos: [],
      show: false,
      courseDisplay: null,
      showOverlap: false,
      addCourse: true
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow(course, bAdd) {
    this.setState({ show: true, courseDisplay: course, addCourse: bAdd });
  }
  overlapClose() {
    this.setState({ showOverlap: false });
  }

  overlapShow(course) {
    this.setState({ showOverlap: true });
  }
  setCourseList(tmpArr, courseList, index) {
    if (courseList) {
      this.setState({ showOverlap: false });
      for (var i = 0; i < courseList.length; i++) {
        setCourses(tmpArr, courseList[i], index);
      }
    } else {
      this.setState({ showOverlap: true });
    }
  }

  renderCourseModal() {
    const { courseDisplay, show, addCourse } = this.state;
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
              <div>{displayCourseOptions(courseDisplay)}</div>
            </Modal.Body>
            <Modal.Footer>
              {addCourse ? (
                <Button onClick={() => this.addCourse(courseDisplay)}>
                  Add Course
                </Button>
              ) : (
                <Button onClick={() => this.removeCourse(courseDisplay)}>
                  Remove Course
                </Button>
              )}
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
  renderOverlapModal() {
    const { showOverlap } = this.state;
    return (
      <div>
        <Modal show={showOverlap} onHide={this.overlapClose}>
          <Modal.Header>
            <Modal.Title>No combinations that work</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.overlapClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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
      var combinationList = tmpSchedule[0];
      var tmpArr = [];
      var index = 0;
      this.setCourseList(tmpArr, combinationList, index);
      this.setState({
        selectedIntervals: tmpArr,
        scheduleIndex: 1,
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
    return _.map(course.allCourses, item => {
      return (
        <li>
          <Button className="courseButton">
            <div
              type="button"
              className="close plus"
              onClick={() => this.addCourse(item)}
            >
              <span aria-hidden="true">&times;</span>
            </div>
            <div className="title" onClick={() => this.handleShow(item, true)}>
              {item[0].code}
            </div>
          </Button>
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
        let tmpArr = courseArray;
        tmpArr.splice(i, 1);
        this.setState({ courseArray: tmpArr });
      }
    }
    this.setState({ show: false });
  }
  showSelectedCourses() {
    const { courseArray } = this.state;
    return _.map(courseArray, item => {
      return (
        <li>
          <Button className="courseButton">
            <div
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => this.removeCourse(item)}
            >
              <span aria-hidden="true">&times;</span>
            </div>
            <div className="title" onClick={() => this.handleShow(item, false)}>
              {item[0].code}
            </div>
          </Button>
        </li>
      );
    });
  }
  render() {
    const {
      showSchedule,
      courseArray,
      scheduleCombos,
      scheduleIndex
    } = this.state;
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
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    {this.showCoursesAvailable()}
                  </ul>
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
            <Button onClick={() => this.goBack()}>Back</Button>
            <Button onClick={() => this.nextSchedule()}>Next Schedule</Button>
            {scheduleCombos &&
              scheduleCombos.length > 0 && (
                <div>
                  {scheduleIndex}/{scheduleCombos.length}
                </div>
              )}
            <WeekCalendar
              startTime={moment({ h: 8, m: 30 })}
              endTime={moment({ h: 17, m: 45 })}
              numberOfDays={5}
              selectedIntervals={this.state.selectedIntervals}
              onIntervalSelect={this.handleSelect}
              onIntervalUpdate={this.handleEventUpdate}
              onIntervalRemove={this.handleEventRemove}
            />
            {this.renderOverlapModal()}
          </div>
        )}
      </div>
    );
  }
}
