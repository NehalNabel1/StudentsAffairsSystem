import { ViewStudent } from "./modules/view/ViewStudents.js";

let stdObj = new ViewStudent();
let students = await stdObj.view();

/***************print students info**************** */
console.log(students);
students.forEach((student) => {
  console.log(student.name);
  console.log(student.id);
  console.log(student.department);
  console.log(student.email);
  console.log(student.courses);
});
