import { ViewPeople } from "./modules/view/ViewPeople.js";
import { ViewCourses } from "./modules/view/ViewCourses.js";
import { AddPeople } from "./modules/add/AddPeople.js";
import { EditPeople } from "./modules/edit/EditPeople.js";

let tbody = document.querySelector(".tbody");
let tr = document.querySelector(".tr");
let saveContactBtn = document.querySelector("#saveContactBtn");
let updateContactBtn = document.querySelector(".updateContactBtn");

let staffName = document.querySelector("#staffName");
let role = document.querySelector("#role");
let email = document.querySelector("#email");
let department = document.querySelector("#department");

let checkBox = document.querySelector(".form-checkboxes");
let courseCheck = document.querySelectorAll(".course-check");

let newTr;
let checkCourses = [];

/************************************** view students info in table****************************** */
let viewPeopleTable = async () => {
  let Obj = new ViewPeople();
  let res = await Obj.view();

  res.forEach((elem) => {
    newTr = tr.cloneNode(true);
    newTr.classList.remove("d-none");
    newTr.children[0].innerText = elem.name;
    newTr.children[1].innerText = elem.role;
    newTr.children[2].innerText = elem.department;
    newTr.children[3].innerText = elem.email;
    newTr.children[4].innerText = elem.id;

    tbody.appendChild(newTr);
  });
};
viewPeopleTable();

/*********************************function to handle add new staff when click save student button ********************* */

let addNewPeople = async () => {
  saveContactBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    let addObj = new AddPeople();

    let newObj = await addObj.add({
      name: staffName.value,
      role: role.value,
      department: department.value,
      email: email.value,
    });
    console.log(newObj);
  });
};
addNewPeople();

/*********************************function to handle edit stuff data ********************* */

let id = 1;

let editObj = new EditPeople();
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("editBtn")) {
    e.preventDefault();
    updateContactBtn.classList.remove("d-none");
    saveContactBtn.classList.add("d-none");

    const row = e.target.parentElement.parentElement;
    staffName.value = row.children[0].innerText;
    role.value = row.children[1].innerText;
    department.value = row.children[2].innerText;
    email.value = row.children[3].innerText;

    id = row.children[4].innerText;
  }

  if (e.target.classList.contains("updateContactBtn")) {
    let updateData = {
      name: staffName.value,
      role: role.value,
      department: department.value,
      email: email.value,
    };
    console.log(updateData);

    let editstudent = await editObj.edit(id, updateData);
  }
});
