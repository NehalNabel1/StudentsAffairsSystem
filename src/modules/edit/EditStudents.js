import { CRUD } from "../CRUD/CRUD.js";
export class editStudents extends CRUD {
  edit = async (studentId, updateStudent) => {
    try {
      let res = await fetch(`http://localhost:4000/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateStudent),
      });
      if (!res.ok) {
        throw new Error("Failed to update student");
      }
      let upStudent = await res.json();
      return upStudent;
    } catch (err) {
      console.log("Error : ", err);
    }
  };
}
