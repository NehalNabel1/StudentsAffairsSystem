import { CRUD } from "../CRUD/CRUD.js";
export class ViewCourses extends CRUD {
  view = async () => {
    try {
      let res = await fetch("http://localhost:4000/courses");
      let courses = await res.json();
      return courses;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
