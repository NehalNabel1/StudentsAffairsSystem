import { CRUD } from "../CRUD/CRUD.js";
export class ViewStudents extends CRUD {
  view = async () => {
    try {
      let res = await fetch("http://localhost:4000/students");
      let students = await res.json();
      return students;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
