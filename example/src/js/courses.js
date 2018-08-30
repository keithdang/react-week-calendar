const math141 = [
  {
    name: "Calculus",
    code: "Math 141",
    days: [1, 3, 5],
    startHour: 8,
    startMinute: 35,
    endHour: 9,
    endMinute: 25
  }
];
const math133 = [
  {
    name: "Linear Algebra",
    code: "Math 133",
    days: [1, 3, 5],
    startHour: 9,
    startMinute: 35,
    endHour: 10,
    endMinute: 25
  },
  {
    name: "Linear Algebra",
    code: "Math 133",
    days: [2, 4],
    startHour: 14,
    startMinute: 5,
    endHour: 15,
    endMinute: 25
  }
];
const chem120 = [
  {
    name: "Introduction to Chemistry",
    code: "Chem 120",
    days: [1, 3, 5],
    startHour: 10,
    startMinute: 35,
    endHour: 11,
    endMinute: 25
  }
];
const phys130 = [
  {
    name: "Introduction to Physics",
    code: "Phys 130",
    days: [2, 4],
    startHour: 12,
    startMinute: 35,
    endHour: 13,
    endMinute: 55
  },
  {
    name: "Introduction to Physics",
    code: "Phys 130",
    days: [1, 3, 5],
    startHour: 12,
    startMinute: 35,
    endHour: 13,
    endMinute: 25
  }
];
const ecse200 = [
  {
    name: "Circuits I",
    code: "Ecse 200",
    days: [2, 4],
    startHour: 9,
    startMinute: 35,
    endHour: 10,
    endMinute: 55
  }
];
const comp202 = [
  {
    name: "Introduction to Programming",
    code: "Comp 202",
    days: [2, 4],
    startHour: 9,
    startMinute: 35,
    endHour: 10,
    endMinute: 55
  }
];
const allCourses = [math133, math141, chem120, phys130, ecse200, comp202];
module.exports = {
  math141: math141,
  math133: math133,
  chem120: chem120,
  phys130: phys130,
  ecse200: ecse200,
  allCourses: allCourses
};
