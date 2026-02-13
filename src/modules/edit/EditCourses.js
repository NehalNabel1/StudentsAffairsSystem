import { CRUD } from "../CRUD/CRUD.js";
export class EditCourses extends CRUD {
  edit = async (coursesId, updateCourses) => {
    try {
      let res = await fetch(`http://localhost:4000/courses/${coursesId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateCourses),
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
