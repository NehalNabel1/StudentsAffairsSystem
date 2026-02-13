import { CRUD } from "../CRUD/CRUD.js";
export class AddPeople extends CRUD {
  add = async (newStudent) => {
    try {
      /*get all student to assign unique id */
      let allRes = await fetch("http://localhost:4000/people");
      let allStudents = await allRes.json();
      let ids = allStudents.map((student) => student.id);
      let maxId = allStudents.length ? Math.max(...ids) : 0;
      newStudent.id =parseInt(maxId + 1) ;

      let res = await fetch("http://localhost:4000/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (!res.ok) {
        throw new Error("Failed to add people");
      }
      let students = await res.json();
      return maxId + 1;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
