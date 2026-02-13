import { ViewStudents } from "./modules/view/ViewStudents.js";
import { ViewCourses } from "./modules/view/ViewCourses.js";
import { AddStudents } from "./modules/add/AddStudents.js";
import { editStudents } from "./modules/edit/EditStudents.js";

let tbody = document.querySelector(".tbody");
let tr = document.querySelector(".tr");
let saveContactBtn = document.querySelector("#saveContactBtn");
let updateContactBtn = document.querySelector("#updateContactBtn");

let fullName = document.querySelector("#fullName");
let department = document.querySelector("#department");
let email = document.querySelector("#email");

let checkBox = document.querySelector(".form-checkboxes");
let courseCheck = document.querySelectorAll(".course-check");

let newTr;
let checkCourses = [];

let viewCoursesTable = async () => {
  let crsObj = new ViewCourses();
  let courses = await crsObj.view();
  /*****************************add  avaliable courses to student checkbox *************************** */
  courses.forEach((course) => {
    let newCourse = courseCheck[0].cloneNode(true);

    newCourse.classList.remove("d-none");
    newCourse.children[1].innerText = course.id;
    let checkInput = newCourse.querySelector(".inputCheck");
    checkInput.value = course.id;
    /*****************************add eventlistener to every checkbox created *************************** */
    checkInput.addEventListener("change", function () {
      if (this.checked) {
        checkCourses.push(checkInput.value);
      } else {
        checkCourses = checkCourses.filter((crs) => crs != checkInput.value);
      }
    });

    checkBox.appendChild(newCourse);
  });
};
viewCoursesTable();

/*********************************function to handle add new student when click save student button ********************* */
let addNewStudent = async () => {
  saveContactBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    let newstd = new AddStudents();
    console.log(department.value);
    console.log(email.value);

    let newStudent = await newstd.add({
      name: fullName.value,
      department: department.value,
      email: email.value,
      courses: checkCourses,
    });
    console.log(newstudent);
  });
};
addNewStudent();

/************************************** view students info in table****************************** */
let viewStudentsTable = async () => {
  let stdObj = new ViewStudents();
  let students = await stdObj.view();
  students.forEach((student) => {
    newTr = tr.cloneNode(true);
    newTr.classList.remove("d-none");
    newTr.children[0].innerText = student.name;
    newTr.children[1].innerText = student.department;
    newTr.children[2].innerText = student.email;
    newTr.children[3].innerText = student.courses;
    newTr.children[4].innerText = student.id;

    tbody.appendChild(newTr);
  });
};
viewStudentsTable();

/*********************************function to handle edit student data ********************* */

let id = 1;

let editStdObj = new editStudents();
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("editBtn")) {
    e.preventDefault();
    updateContactBtn.classList.remove("d-none");
    saveContactBtn.classList.add("d-none");

    const row = e.target.parentElement.parentElement;
    console.log(row.children[0].innerText);
    fullName.value = row.children[0].innerText;
    department.value = row.children[1].innerText;
    email.value = row.children[2].innerText;

    id = row.children[4].innerText;
  }

  if (e.target.classList.contains("updateContactBtn")) {
    let updateData = {
      name: fullName.value,
      department: department.value,
      email: email.value,
      courses: checkCourses,
    };
    console.log(updateData);

    let editstudent = await editStdObj.edit(id, updateData);
  }
});
