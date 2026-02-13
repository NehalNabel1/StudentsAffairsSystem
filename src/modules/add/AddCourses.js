import { CRUD } from "../CRUD/CRUD.js";
export class AddCourses extends CRUD {
  add = async (newCrs) => {
    try {
      /*get all student to assign unique id */
      let allRes = await fetch("http://localhost:4000/courses");
      let allCrs = await allRes.json();
      let ids = allCrs.map((student) => student.id);
      let maxId = allCrs.length ? Math.max(...ids) : 0;
      newCrs.id = parseInt(maxId + 1);

      let res = await fetch("http://localhost:4000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCrs),
      });
      if (!res.ok) {
        throw new Error("Failed to add courses");
      }
      let students = await res.json();
      return maxId + 1;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
