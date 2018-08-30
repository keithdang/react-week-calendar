import React from "react";
import moment from "moment";
import WeekCalendar from "react-week-calendar";
import { schedule } from "./schedule";
import course from "./courses";
// var courseArray = [
//   course.math133,
//   course.math141,
//   course.chem120,
//   course.ecse200,
//   course.phys130
// ];
export default class StandardCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.setCourseList = this.setCourseList.bind(this);
    this.setCourses = this.setCourses.bind(this);
    this.nextSchedule = this.nextSchedule.bind(this);
    this.state = {
      lastUid: 4,
      selectedIntervals: [],
      scheduleIndex: 0,
      showSchedule: false,
      courseArray: [
        // course.math133,
        // course.math141,
        // course.chem120,
        // course.ecse200,
        // course.phys130
      ],
      scheduleCombos: []
    };
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
        value: course.name
      };
      arr.push(courseInfo);
      index++;
    }
  }
  setCourseList(tmpArr, courseList, index) {
    //console.log(tmpArr, courseList, index);
    for (var i = 0; i < courseList.length; i++) {
      this.setCourses(tmpArr, courseList[i], index);
    }
  }
  componentDidMount() {
    // const { scheduleIndex, courseArray } = this.state;
    // if (courseArray && courseArray.length > 0) {
    //   //console.log("component mount + course array");
    //   var combinationList = schedule(courseArray)[scheduleIndex];
    //   var tmpArr = [];
    //   var index = 0;
    //   this.setCourseList(tmpArr, combinationList, index);
    //   this.setState({
    //     selectedIntervals: tmpArr,
    //     scheduleIndex: scheduleIndex + 1
    //   });
    // }
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
    // var combinationList = schedule(courseArray)[scheduleIndex];
    var tmpArr = [];
    var index = 0;
    var newIndex = scheduleIndex + 1;
    if (scheduleIndex === scheduleCombos.length - 1) {
      // if (scheduleIndex === schedule(courseArray).length - 1) {
      newIndex = 0;
    }
    this.setCourseList(tmpArr, combinationList, index);
    this.setState({ selectedIntervals: tmpArr, scheduleIndex: newIndex });
  }
  selectCourses() {
    const { scheduleIndex, courseArray, showSchedule } = this.state;
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
  }
  showCoursesAvailable() {
    console.log("show all:", course.allCourses);
    return _.map(course.allCourses, item => {
      return (
        <li>
          <a role="button" onClick={() => this.addCourse(item)}>
            {item[0].name}
          </a>
        </li>
      );
    });
  }
  goBack() {
    this.setState({ showSchedule: false });
  }
  showSelectedCourses() {
    const { courseArray } = this.state;
    return _.map(courseArray, item => {
      return (
        <li>
          <a>{item[0].name}</a>
        </li>
      );
    });
  }
  render() {
    const { showSchedule, courseArray } = this.state;
    return (
      <div>
        {!showSchedule && (
          <div>
            <a role="button" onClick={() => this.selectCourses()}>
              Go to schedule
            </a>
            <div style={{ display: "-webkit-box" }}>
              <div>
                <h5>Courses Available</h5>
                <ul>{this.showCoursesAvailable()}</ul>
              </div>
              <div>
                <h5>Courses Selected</h5>
                <ul>{this.showSelectedCourses()}</ul>
              </div>
            </div>
          </div>
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
