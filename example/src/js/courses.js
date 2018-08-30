const math141 = [
  {
    name: "Calculus",
    code: "Math 141",
    days: [1, 3, 5],
    startHour: 8,
    startMinute: 35,
    endHour: 9,
    endMinute: 25,
    color: "#DEDEDE",
    prof: "D. Lowther"
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
    endMinute: 25,
    color: "greenyellow",
    prof: "K. Dang"
  },
  {
    name: "Linear Algebra",
    code: "Math 133",
    days: [2, 4],
    startHour: 14,
    startMinute: 5,
    endHour: 15,
    endMinute: 25,
    color: "greenyellow",
    prof: "G. Woola"
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
    endMinute: 25,
    color: "#FFC4C4",
    prof: "L. Li"
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
    endMinute: 55,
    color: "#c4e9ff",
    prof: "R. Raegan"
  },
  {
    name: "Introduction to Physics",
    code: "Phys 130",
    days: [1, 3, 5],
    startHour: 12,
    startMinute: 35,
    endHour: 13,
    endMinute: 25,
    color: "#c4e9ff",
    prof: "T. Gates"
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
    endMinute: 55,
    color: "#dca6ff",
    prof: "E. Mourrad"
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
    endMinute: 55,
    color: "#FFFF79",
    prof: "M. Soft"
  }
];
const comp250 = [
  {
    name: "Data Structures and Algorithms",
    code: "Comp 250",
    days: [2, 4],
    startHour: 13,
    startMinute: 35,
    endHour: 14,
    endMinute: 55,
    color: "#7BFF3B",
    prof: "A. Intel"
  },
  {
    name: "Data Structures and Algorithms",
    code: "Comp 250",
    days: [1, 3],
    startHour: 13,
    startMinute: 35,
    endHour: 14,
    endMinute: 55,
    color: "#7BFF3B",
    prof: "M. Lorne"
  }
];
const soci102 = [
  {
    name: "Introduction to Socialogy",
    code: "Soci 102",
    days: [2],
    startHour: 14,
    startMinute: 35,
    endHour: 17,
    endMinute: 25,
    color: "#FF983B",
    prof: "B. Peterson"
  },
  {
    name: "Introduction to Socialogy",
    code: "Soci 102",
    days: [3],
    startHour: 14,
    startMinute: 35,
    endHour: 17,
    endMinute: 25,
    color: "#FF983B",
    prof: "T. Kirk"
  },
  {
    name: "Introduction to Socialogy",
    code: "Soci 102",
    days: [2, 4],
    startHour: 11,
    startMinute: 5,
    endHour: 12,
    endMinute: 25,
    color: "#FF983B",
    prof: "C. Uygyr"
  }
];
const allCourses = [
  math133,
  math141,
  chem120,
  phys130,
  ecse200,
  comp202,
  soci102,
  comp250
];
module.exports = {
  math141: math141,
  math133: math133,
  chem120: chem120,
  phys130: phys130,
  ecse200: ecse200,
  allCourses: allCourses
};
