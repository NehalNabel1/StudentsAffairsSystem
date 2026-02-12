import { ViewStudents } from "./modules/view/ViewStudents.js";
import { AddStudents } from "./modules/add/AddStudents.js";

let tbody = document.querySelector(".tbody");
let tr = document.querySelector(".tr");
let addBtn = document.querySelector("#addStudentBtn");
let saveContactBtn = document.querySelector("#saveContactBtn");
let fullName = document.querySelector("#fullName");
let department = document.querySelector("#department");
let email = document.querySelector("#email");
let crs1 = document.querySelector("#crs1");
let crs2 = document.querySelector("#crs2");
let newTr;

let stdObj = new ViewStudents();
let students = await stdObj.view();

let addNewStudents = () => {
  saveContactBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    let newstd = new AddStudents();
    console.log(department.value);
    console.log(email.value);

    let newstudent = await newstd.add({
      name: fullName.value,
      department: department.value,
      email: email.value,
      courses: [1, 2],
    });
    console.log(newstudent);
  });
};
addNewStudents();
/*let newstd = new AddStudents();
let newstudent = await newstd.add({
  id: 3,
  name: "Nehal Ali",
  department: "Computer Science",
  email: "nehal@student.edu",
  courses: [1, 2],
});
console.log(newstudent);*/

/***************view students info in table**************** */
students.forEach((student) => {
  newTr = tr.cloneNode(true);
  newTr.classList.remove("d-none");
  newTr.children[0].innerText = student.name;
  newTr.children[1].innerText = student.department;
  newTr.children[2].innerText = student.email;
  newTr.children[3].innerText = student.courses;

  tbody.appendChild(newTr);
});
