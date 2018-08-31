import _ from "lodash";
import course from "./courses";
//var _ = require("lodash");
//var course = require("./courses2");
//2:30-3:30    3:00-4:00
function timeInMinutes(hour, minute) {
  return 60 * hour + minute;
}
function checkHourMinuteOverlap(courseA, courseB) {
  var overlap = false;
  var startA = timeInMinutes(courseA.startHour, courseA.startMinute);
  var startB = timeInMinutes(courseB.startHour, courseB.startMinute);
  var endA = timeInMinutes(courseA.endHour, courseA.endMinute);
  var endB = timeInMinutes(courseB.endHour, courseB.endMinute);
  if (
    (startA >= startB && startA <= endB) ||
    (endA >= startB && endA <= endB)
  ) {
    overlap = true;
  }
  return overlap;
}
function checkDayOverlap(courseA, courseB) {
  var overlap = false;
  for (var i = 0; i < courseA.days.length; i++) {
    for (var j = 0; j < courseB.days.length; j++) {
      if (courseA.days[i] == courseB.days[j]) {
        //console.log("Overlap days detected:", courseA, courseB);
        //console.log("Overlap days detected:", courseA.days[i], courseB.days[j]);
        if (checkHourMinuteOverlap(courseA, courseB)) {
          //console.log("time conflict");
          overlap = true;
          break;
        }
      }
    }
  }
  return overlap;
}
function checkOverlap(courseA, courseB) {
  return checkDayOverlap(courseA, courseB);
}
function addToSchedule(course, weekSchedule) {
  var overlap = false;
  if (weekSchedule.length === 0) {
    // console.log("No courses yet, filling...\n");
    //weekSchedule.push(course);
    overlap = false;
  } else {
    for (var i = 0; i < weekSchedule.length; i++) {
      //console.log("kdawg", i);
      //console.log("Course to insert:", course);
      //console.log("Course checking if overlaps:", weekSchedule[i]);
      if (checkOverlap(course, weekSchedule[i])) {
        overlap = true;
        //weekSchedule.push(course);
        break;
      }
    }
  }
  return overlap;
  //   if (!overlap) {
  //     weekSchedule.push(course);
  //   }
}
function checkAllPossibilities(
  course,
  index,
  maxNum,
  currentArray,
  listOfCombinations
) {
  if (index < maxNum) {
    for (var i = 0; i < course[index].length; i++) {
      //console.log(course[index][i].name, course[index][i].days);
      let tmpArr = _.cloneDeep(currentArray);
      if (!addToSchedule(course[index][i], tmpArr)) {
        //console.log("pushing ", course[index][i]);
        tmpArr.push(course[index][i]);
      } else {
        console.log("overlap lap,discontinuing");
        continue;
      }

      checkAllPossibilities(
        course,
        index + 1,
        maxNum,
        tmpArr,
        listOfCombinations
      );
    }
  } else {
    //console.log("schedule that works:", currentArray);
    listOfCombinations.push(currentArray);
  }
}
export function schedule(courseArray) {
  var listOfCombinations = [];
  var currentArray = [];
  var maxNum = courseArray.length;
  checkAllPossibilities(
    courseArray,
    0,
    maxNum,
    currentArray,
    listOfCombinations
  );
  return listOfCombinations;
}
