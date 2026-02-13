import { ViewCourses } from "./modules/view/ViewCourses.js";
import { AddCourses } from "./modules/add/AddCourses.js";
import { EditCourses } from "./modules/edit/EditCourses.js";
import { ViewPeople } from "./modules/view/ViewPeople.js";

let tbody = document.querySelector(".tbody");
let tr = document.querySelector(".tr");
let saveContactBtn = document.querySelector("#saveContactBtn");
let updateContactBtn = document.querySelector(".updateContactBtn");

let courseName = document.querySelector("#courseName");
let instructorId = document.querySelector("#instructorId");
let courseCode = document.querySelector("#courseCode");
let startDate = document.querySelector("#startDate");
let durationWeeks = document.querySelector("#durationWeeks");

let checkBox = document.querySelector(".form-checkboxes");
let courseCheck = document.querySelectorAll(".course-check");

let newTr;
let checkInstructors = [];

/************************************** view courses info in table****************************** */

let viewCoursesTable = async () => {
  let Obj = new ViewCourses();
  let res = await Obj.view();

  res.forEach((elem) => {
    newTr = tr.cloneNode(true);
    newTr.classList.remove("d-none");
    newTr.children[0].innerText = elem.code;
    newTr.children[1].innerText = elem.name;
    newTr.children[2].innerText = elem.startDate;
    newTr.children[3].innerText = elem.durationWeeks;
    newTr.children[4].innerText = elem.instructorId;
    newTr.children[5].innerText = elem.id;

    tbody.appendChild(newTr);
  });
};
viewCoursesTable();

let viewInstructorName = async () => {
  let checkInput;
  let stuffObj = new ViewPeople();
  let res = await stuffObj.view();
  /*****************************add  avaliable Instructors to Courses checkbox *************************** */
  res.forEach((stuff) => {
    if (stuff.role === "Instructor") {
      let newIns = courseCheck[0].cloneNode(true);

      newIns.classList.remove("d-none");
      newIns.children[1].innerText = stuff.id;
      let checkInput = newIns.querySelector(".inputCheck");
      checkInput.value = stuff.id;

      /*****************************add eventlistener to every checkbox created *************************** */
      checkInput.addEventListener("change", function () {
        if (this.checked) {
          checkInstructors.push(checkInput.value);
        } else {
          checkInstructors = checkInstructors.filter(
            (crs) => crs != checkInput.value,
          );
        }
      });

      checkBox.appendChild(newIns);
    }
  });
};
viewInstructorName();

/*********************************function to handle add new course when click save student button ********************* */

let addNewCourses = async () => {
  saveContactBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    let addObj = new AddCourses();

    let newObj = await addObj.add({
      code: courseCode.value,
      instructorId: checkInstructors,
      name: courseName.value,
      startDate: startDate.value,
      durationWeeks: durationWeeks.value,
    });
    console.log(newObj);
  });
};
addNewCourses();

/*********************************function to handle edit student data ********************* */

let id = 1;

let editObj = new EditCourses();
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("editBtn")) {
    e.preventDefault();
    updateContactBtn.classList.remove("d-none");
    saveContactBtn.classList.add("d-none");

    const row = e.target.parentElement.parentElement;
    courseCode.value = row.children[0].innerText;
    //instructorId.value = row.children[1].innerText;
    courseName.value = row.children[1].innerText;
    startDate.value = row.children[2].innerText;
    durationWeeks.value = row.children[3].innerText;

    id = row.children[5].innerText;
  }

  if (e.target.classList.contains("updateContactBtn")) {
    let updateData = {
      code: courseCode.value,
      name: courseName.value,
      startDate: startDate.value,
      durationWeeks: durationWeeks.value,
      instructorId: checkInstructors,
    };
    console.log(updateData);

    let editstudent = await editObj.edit(id, updateData);
  }
});
